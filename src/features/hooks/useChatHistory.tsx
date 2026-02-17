import {useQuery} from "@tanstack/react-query";
import {ChatService} from "@/service/ChatService";

export const useChatHistory = (chatId: string | undefined) => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['chat-history', chatId],
        queryFn: () => ChatService.findChat(chatId as string),
        enabled: !!chatId,
        staleTime: 60 * 1000,
        retry: 1,
    });

    return {
        data,
        loading: isLoading,
        isError,
        error,
        refetch
    };
}