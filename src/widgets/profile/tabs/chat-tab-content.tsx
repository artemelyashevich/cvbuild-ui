"use client";

import {useState} from "react";
import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {Loader2, ChevronLeft, ChevronRight} from "lucide-react";
import {ChatService} from "@/service/ChatService";
import {ChatCard} from "@/widgets/profile/tabs/chat-card";

export const ChatHistoryTab = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);

    const {data, isLoading, isError, isPlaceholderData} = useQuery({
        queryKey: ["my-chats", page, pageSize], // добавили pageSize
        queryFn: () =>
            ChatService.findByCurrent({
                page,
                size: pageSize,
                sort: "updatedAt",
                direction: "desc",
            }),
        placeholderData: keepPreviousData,
    });

    const handlePageSizeChange = (size: number) => {
        setPage(0);
        setPageSize(size);
    };

    if (isLoading) {
        return (
            <div className="flex h-64 w-full items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-300"/>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-center border border-red-100 bg-red-50 rounded-[2rem] text-red-600">
                Не удалось загрузить историю чатов.
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.content.map((chat) => (
                    <div key={chat.id} className="min-h-[280px]">
                        <ChatCard chat={chat}/>
                    </div>
                ))}
            </div>

            {page === 0 && data?.content.length === 0 && (
                <div className="text-center py-10 text-zinc-400">
                    У вас пока нет истории диалогов.
                </div>
            )}

            <div className={"flex justify-center gap-3 items-center align-middle"}>
                {(data?.totalPages ?? 0) > 1 && (
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setPage((old) => Math.max(old - 1, 0))}
                            disabled={page === 0}
                            className="rounded-full w-10 h-10 border-zinc-200 hover:bg-zinc-100 disabled:opacity-30"
                        >
                            <ChevronLeft className="w-4 h-4"/>
                        </Button>

                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            {page + 1} / {data?.totalPages}
          </span>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                if (!data?.last) {
                                    setPage((old) => old + 1);
                                }
                            }}
                            disabled={data?.last || isPlaceholderData}
                            className="rounded-full w-10 h-10 border-zinc-200 hover:bg-zinc-100 disabled:opacity-30"
                        >
                            <ChevronRight className="w-4 h-4"/>
                        </Button>
                    </div>
                )}
                <div className="flex justify-end">
                    <select
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        className="border rounded-xl px-3 py-2 text-sm bg-white"
                    >
                        <option value={4}>4 на странице</option>
                        <option value={6}>6 на странице</option>
                        <option value={8}>8 на странице</option>
                        <option value={12}>12 на странице</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
