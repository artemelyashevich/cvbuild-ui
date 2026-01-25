'use client'

import Cookies from "js-cookie";
import {useQuery} from "@tanstack/react-query";
import {UserService} from "@/service/UserService";

function useAuth() {
    const token = Cookies.get("access_token");

    const {
        data: user,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['user-profile'],
        queryFn: () => UserService.getCurrent(),
        enabled: !!token,
        staleTime: 5 * 60 * 1000,
        retry: (failureCount, error: any) => {
            if (error.message === "Unauthorized") return false;
            return failureCount < 3;
        }
    });

    return {
        user,
        loading: isLoading,
        isError,
        error,
        refetch,
        isAuthenticated: !!user && !isError
    };
}

export default useAuth