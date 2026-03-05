'use client';

import { useState } from 'react';
import CategoryStep, { ResumeStepData } from '@/widgets/steps/category-step';
import useResumeFlowQuestions from "@/features/hooks/use-resume-flow-questions";
import { useResumeStore } from "@/features/store/resume-store";
import {useSendResumeFlowForm} from "@/features";

export default function ResumeFlowPage() {
    const { data, loading } = useResumeFlowQuestions();
    const [step, setStep] = useState(0);
    const resume = useResumeStore();
    const {mutate} = useSendResumeFlowForm()

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;

    const categories = [
        'personal_information',
        'links',
        'job',
        'education',
        'skills',
        'highlights',
        'career_goals'
    ] as const;

    const total = categories.length;

    if (step >= total) {
        mutate()
        return <div>All steps completed!</div>
    }

    const categoryName = categories[step];
    const stepData: ResumeStepData = data[categoryName] as unknown as ResumeStepData;

    const next = () => setStep((s) => s + 1);
    const back = () => setStep((s) => s - 1);

    return (
        <CategoryStep
            stepIndex={step}
            total={total}
            next={next}
            back={back}
            categoryName={categoryName}
            stepData={stepData}
        />
    );
}