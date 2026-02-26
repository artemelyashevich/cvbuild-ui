'use client'

import Cookies from "js-cookie";
import {useQuery} from "@tanstack/react-query";
import {UserService} from "@/service/UserService";
import {useUserStore} from "@/features";

function useAuth() {
    const token = Cookies.get("access_token");
    const { user, setUser } = useUserStore();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['user-profile'],
        queryFn: () => UserService.getCurrent(),
        enabled: !!token && !user,
        staleTime: 5 * 60 * 1000,
        retry: (failureCount, error: any) => {
            if (error.message === "Unauthorized") return false;
            return failureCount < 3;
        },
        onSuccess: (data) => {
            setUser(data);
        }
    });

    return {
        user: user || data,
        loading: isLoading,
        isError,
        error,
        refetch,
        isAuthenticated: !!(user || data) && !isError,
    };
}

export default useAuth;