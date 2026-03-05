'use client';

import { useQuery } from "@tanstack/react-query";
import { ResumeFlowService } from "@/service/ResumeFlowService";

export interface ResumeQuestion {
    field: string;
    question: string;
}

export interface ResumeFlowStepData {
    voiceInput: boolean;
    questions: ResumeQuestion[];
}

export interface ResumeFlowResponse {
    personal_information?: ResumeFlowStepData;
    links?: ResumeFlowStepData;
    job?: ResumeFlowStepData;
    education?: ResumeFlowStepData;
    skills?: ResumeFlowStepData;
    highlights?: ResumeFlowStepData;
    career_goals?: ResumeFlowStepData;
}

interface UseResumeFlowResult {
    data?: ResumeFlowResponse;
    loading: boolean;
    isError: boolean;
    error: unknown;
    refetch: () => void;
}

function useResumeFlowQuestions(): UseResumeFlowResult {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['resume-flow-questions'],
        queryFn: async () => {
            const res = await ResumeFlowService.roadmap();
            return res.data as ResumeFlowResponse;
        },
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

export default useResumeFlowQuestions;