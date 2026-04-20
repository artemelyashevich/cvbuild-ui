'use client'

import {useMutation} from "@tanstack/react-query";
import {ChatService} from "@/service/ChatService";
import {SettingsService} from "@/service/SettingsService";

export default function useAgree() {
    const {
        data: agreement,
        isPending,
        mutate,
        mutateAsync,
        error,
    } = useMutation({
        mutationKey: ["user-agree"],
        mutationFn: () => SettingsService.agree(),
    });

    return {
        error,
        agreement,
        loading: isPending,
        mutate,
        mutateAsync
    };
}
