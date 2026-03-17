
import {useQuery} from "@tanstack/react-query";
import {SettingsService} from "@/service/SettingsService";

export default function useSettings() {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['user-settings'],
        queryFn: () => SettingsService.findSettings(),
        staleTime: 5 * 60 * 1000,
        retry: (failureCount, error: any) => {
            if (error.message === "Unauthorized") return false;
            return failureCount < 3;
        }
    });

    return {
        data,
        loading: isLoading,
        isError,
        error,
        refetch
    };
}