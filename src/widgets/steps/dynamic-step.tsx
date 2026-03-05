'use client';

import { useState, useEffect } from 'react';
import StepLayout from "@/widgets/steps/step-layout";
import { Input } from '@/components/ui/input';
import { useResumeStore } from "@/features/store/resume-store";
import useResumeFlowQuestions from "@/features/hooks/use-resume-flow-questions";
import {ResumeQuestion} from "@/features";

interface Props {
    stepIndex: number;
    total: number;
    next: () => void;
    back: () => void;
}

export default function DynamicResumeStep({ stepIndex, total, next, back }: Props) {
    const { data, loading } = useResumeFlowQuestions();

    const allQuestions: ResumeQuestion[] = data
        ? [
            ...(data.personal_information || []),
            ...(data.links || []),
            ...(data.job || []),
            ...(data.education || []),
            ...(data.skills || []),
            ...(data.highlights || []),
            ...(data.career_goals || []),
        ]
        : [];

    const question = allQuestions[stepIndex];

    const [value, setValue] = useState('');

    // Zustand setters
    const setLinkedin = useResumeStore((s) => s.setLinkedin);
    const setSkills = useResumeStore((s) => s.setSkills);
    const setHighlights = useResumeStore((s) => s.setHighlights);
    const setCareerGoals = useResumeStore((s) => s.setCareerGoals);

    useEffect(() => {
        setValue('');
    }, [stepIndex]);

    const handleSave = () => {
        if (!question) return;

        switch (question.field) {
            case 'LINKEDIN':
                setLinkedin(value);
                break;
            case 'SKILL':
                setSkills(value.split(',').map((s) => s.trim()));
                break;
            case 'HIGHLIGHT':
                setHighlights(value);
                break;
            case 'CAREER_GOAL':
                setCareerGoals(value);
                break;
            default:
                break;
        }

        next();
    };

    if (loading) return <div>Loading...</div>;
    if (!question) return <div>No question found</div>;

    return (
        <StepLayout
            step={stepIndex + 1}
            total={total}
            onNext={handleSave}
            onBack={back}
            onSkip={next}
            nextLabel="Continue"
        >
            <div className="flex flex-col space-y-6">
                <label className="font-medium text-zinc-700">{question.question}</label>
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={question.question}
                    className="h-14 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 px-6"
                />
            </div>
        </StepLayout>
    );
}