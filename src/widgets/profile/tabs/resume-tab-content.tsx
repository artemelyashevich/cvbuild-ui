import {CreateResumePlaceholder, ResumeCard} from "./resume-card";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {ChatService} from "@/service/ChatService";
import {useState} from "react";
import {Loader2} from "lucide-react";
import {ChatCard} from "@/widgets/profile/tabs/chat-card";

export const ResumeTabContent = ({updatedAt}: { updatedAt?: string }) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const {data, isLoading, isError, isPlaceholderData} = useQuery({
        queryKey: ["resumes", page, pageSize], // добавили pageSize
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
//FIXME
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CreateResumePlaceholder/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.content.map((resume) => (
                    <div key={resume.id} className="min-h-[280px]">
                        <ResumeCard
                            title={resume?.name}
                            category="Frontend Developer"
                            updatedAt={resume?.updatedAt}
                        />
                    </div>
                ))}
            </div>

            {page === 0 && data?.content.length === 0 && (
                <div className="text-center py-10 text-zinc-400">
                    У вас пока нет истории диалогов.
                </div>
            )}

        </div>
    )
}

