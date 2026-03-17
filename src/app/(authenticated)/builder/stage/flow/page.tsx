'use client';

import { useEffect, useState } from 'react';
import CategoryStep, { ResumeStepData } from '@/widgets/steps/category-step';
import useResumeFlowQuestions from '@/features/hooks/use-resume-flow-questions';
import { useSendResumeFlowForm } from '@/features';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
    'personal_information',
    'links',
    'job',
    'education',
    'skills',
    'highlights',
    'career_goals',
] as const;

export default function ResumeFlowPage() {
    const { data, loading } = useResumeFlowQuestions();
    const { mutate, data: response, isPending } = useSendResumeFlowForm();
    const { push } = useRouter();

    const [step, setStep] = useState(0);

    const total = CATEGORIES.length;
    const isFinished = step >= total;

    useEffect(() => {
        if (isFinished) {
            mutate();
        }
    }, [isFinished, mutate]);

    useEffect(() => {
        if (response) {
            push(`/builder/${response.id}`);
        }
    }, [response, push]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data</div>;
    }

    if (isFinished || isPending) {
        return <Loader2 className="animate-spin" />;
    }

    const categoryName = CATEGORIES[step];
    const stepData = data[categoryName] as ResumeStepData;

    const next = () => setStep((s) => Math.min(s + 1, total));
    const back = () => setStep((s) => Math.max(s - 1, 0));

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