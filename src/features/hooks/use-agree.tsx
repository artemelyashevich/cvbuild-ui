'use client'

import {useMutation} from "@tanstack/react-query";
import {ChatService} from "@/service/ChatService";
import {SettingsService} from "@/service/SettingsService";

export default function useAgree() {
    const {
        data: chatContent,
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
        chatContent,
        loading: isPending,
        mutate,
        mutateAsync
    };
}
