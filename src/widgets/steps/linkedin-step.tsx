'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useResumeStore } from "@/features/store/resume-store";
import StepLayout from "@/widgets/steps/step-layout";
import { Linkedin, Link2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
    step: number;
    total: number;
    next: () => void;
    back?: () => void;
}

export default function LinkedinStep({ step, total, next, back }: Props) {
    const setLinkedin = useResumeStore((s) => s.setLinkedin);
    const existing = useResumeStore((s) => s.linkedin);

    const [val, setVal] = useState(existing || '');
    const [error, setError] = useState('');

    const handleNext = () => {
        if (!val.trim()) {
            next();
            return;
        }

        const isValid =
            val.includes('linkedin.com/in/') ||
            val.includes('linkedin.com/pub/');

        if (!isValid) {
            setError('Please enter a valid LinkedIn profile URL.');
            return;
        }

        setLinkedin(val);
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
                        <Linkedin className="w-4 h-4" />
                        Professional Presence
                    </div>

                    <h2 className="text-4xl font-black tracking-tight leading-[0.9]">
                        Your LinkedIn Profile
                    </h2>

                    <p className="text-zinc-500 font-medium max-w-lg">
                        Добавьте ссылку на профиль, чтобы усилить доверие и
                        расширить контекст для рекрутера.
                    </p>
                </div>

                {/* INPUT BLOCK */}
                <div className="border border-zinc-100 bg-zinc-50/50 rounded-[2.5rem] p-8 shadow-sm space-y-4">

                    <div className="relative">
                        <Link2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />

                        <Input
                            placeholder="https://linkedin.com/in/username"
                            value={val}
                            onChange={(e) => {
                                setVal(e.target.value);
                                if (error) setError('');
                            }}
                            className="h-14 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 text-sm pl-12 pr-6"
                        />
                    </div>

                    <div className="text-xs uppercase tracking-widest font-bold text-zinc-400">
                        Optional — but recommended
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