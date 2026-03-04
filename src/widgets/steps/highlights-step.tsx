'use client';

import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import StepLayout from "@/widgets/steps/step-layout";
import { useResumeStore } from "@/features/store/resume-store";
import { useVoiceInput } from "@/features";
import { Mic, Sparkles } from "lucide-react";

interface Props {
    step: number;
    total: number;
    next: () => void;
    back: () => void;
}

export default function HighlightsStep({ step, total, next, back }: Props) {
    const setHighlights = useResumeStore((s) => s.setHighlights);
    const existing = useResumeStore((s) => s.highlights);

    const [text, setText] = useState(existing || '');

    const { start, isListening } = useVoiceInput((result) => {
        setText((prev) => prev + ' ' + result);
    });

    const handleNext = () => {
        setHighlights(text);
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
                        <Sparkles className="w-4 h-4" />
                        AI Optimized Section
                    </div>

                    <h2 className="text-4xl font-black tracking-tight leading-[0.9]">
                        Professional Highlights
                    </h2>

                    <p className="text-zinc-500 font-medium max-w-lg">
                        Кратко опишите ваши ключевые достижения и сильные стороны.
                        3–5 мощных тезисов достаточно.
                    </p>
                </div>

                {/* TEXTAREA BLOCK */}
                <div className="relative border border-zinc-100 bg-zinc-50/50 rounded-[2.5rem] p-8 shadow-sm">

                    <Textarea
                        rows={6}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Led cross-functional team of 8 engineers...
Increased revenue by 35% in 6 months...
Built scalable microservice architecture..."
                        className="rounded-[2rem] border-zinc-200 focus:border-black focus:ring-0 text-sm p-6 resize-none bg-white"
                    />

                    {/* Character hint */}
                    <div className="mt-4 text-xs uppercase tracking-widest font-bold text-zinc-400">
                        Strong, measurable achievements perform best
                    </div>
                </div>

                {/* VOICE INPUT */}
                <button
                    onClick={start}
                    type="button"
                    className="group inline-flex items-center gap-3 px-6 h-12 rounded-full border border-zinc-200 font-bold uppercase text-xs tracking-wider hover:border-black hover:bg-white transition-all"
                >
                    <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse text-[#D6FF00]' : ''}`} />
                    {isListening ? 'Listening...' : 'Use Voice Input'}
                </button>

            </div>
        </StepLayout>
    );
}