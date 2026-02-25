'use client'

import ResumeForm from "@/widgets/resume/resume-form";
import {useParams} from "next/navigation";
import {ChatService} from "@/service/ChatService";
import {useQuery} from "@tanstack/react-query";
import {Loader2} from "lucide-react";

export default function BuilderPage() {
    const {resumeId} = useParams();
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['resume', resumeId],
        queryFn: () => ChatService.generateOrFindResumeByChatId(resumeId as string),
        enabled: !!resumeId,
        staleTime: 60 * 1000,
        retry: 1,
    });
    if (isError) {
        return <>{error}</>
    }
    if (isLoading) {
        return <Loader2></Loader2>
    }
    return <ResumeForm initialData={data}/>;
}