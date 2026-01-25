'use client'

import { useQuery } from "@tanstack/react-query";
import { UserStatsService } from "@/service/UserStatsService";

function useStats(userId: string | undefined) {
    const {
        data: stats,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['user-stats', userId],
        queryFn: () => UserStatsService.getByUserId(userId as string),
        enabled: !!userId,
        staleTime: 60 * 1000,
        retry: 1,
    });

    return {
        stats,
        loading: isLoading,
        isError,
        error,
        refetch
    };
}

export default useStats;