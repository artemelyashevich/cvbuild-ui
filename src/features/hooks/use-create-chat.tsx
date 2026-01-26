'use client'

import {useMutation} from "@tanstack/react-query";
import {ChatService} from "@/service/ChatService";

export default function useCreateChat() {
    const {
        data: chatContent,
        isPending,
        mutate,
        mutateAsync
    } = useMutation({
        mutationKey: ["user-chat"],
        mutationFn: () => ChatService.createChat(),
    });

    return {
        chatContent,
        loading: isPending,
        mutate,
        mutateAsync
    };
}
