'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeStore } from "@/features/store/resume-store";
import StepLayout from "@/widgets/steps/step-layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Briefcase } from "lucide-react";

interface Props {
    step: number;
    total: number;
    next: () => void;
    back: () => void;
}

export default function JobNameStep({ step, total, next, back }: Props) {
    const setJobName = useResumeStore((s) => s.setJobName);
    const currentJobName = useResumeStore((s) => s.currentJobName);

    const [jobName, setLocalJobName] = useState(currentJobName || '');
    const [error, setError] = useState('');

    const handleNext = () => {
        if (!jobName.trim()) {
            setError('Please enter a job title or skip this step.');
            return;
        }

        setJobName(jobName);
        next();
    };

    return (
        <StepLayout
            step={step}
            total={total}
            onNext={handleNext}
            onBack={back}
            onSkip={next}
            nextLabel="Continue"
        >
            <div className="space-y-10">

                {/* HEADER */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#D6FF00] font-bold uppercase tracking-widest text-xs">
                        <Briefcase className="w-4 h-4" />
                        Positioning
                    </div>

                    <h2 className="text-4xl font-black tracking-tight leading-[0.9]">
                        Target Job Title
                    </h2>

                    <p className="text-zinc-500 font-medium max-w-lg">
                        Укажите позицию, на которую вы подаётесь.
                        Это поможет AI адаптировать формулировки под вакансию.
                    </p>
                </div>

                {/* INPUT BLOCK */}
                <div className="border border-zinc-100 bg-zinc-50/50 rounded-[2.5rem] p-8 shadow-sm space-y-4">

                    <div className="space-y-2">
                        <Label className="uppercase text-xs tracking-widest font-bold text-zinc-400">
                            Desired Position
                        </Label>

                        <Input
                            placeholder="e.g. Senior Frontend Developer"
                            value={jobName}
                            onChange={(e) => {
                                setLocalJobName(e.target.value);
                                if (error) setError('');
                            }}
                            className="h-14 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 text-sm px-6"
                        />
                    </div>

                    <div className="text-xs uppercase tracking-widest font-bold text-zinc-400">
                        Be specific — titles affect keyword matching
                    </div>

                </div>

                {/* ERROR */}
                {error && (
                    <Alert className="rounded-2xl border-red-200 bg-red-50">
                        <AlertDescription className="text-sm font-medium">
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

            </div>
        </StepLayout>
    );
}