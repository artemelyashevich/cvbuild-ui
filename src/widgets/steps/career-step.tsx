'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {useResumeStore} from "@/features/store/resume-store";
import {useVoiceInput} from "@/features";
import StepLayout from "@/widgets/steps/step-layout";
import { Mic } from 'lucide-react';

interface Props {
    step: number;
    total: number;
    back: () => void;
}

export default function CareerGoalsStep({ step, total, back }: Props) {
    const setCareerGoals = useResumeStore((s) => s.setCareerGoals);
    const existing = useResumeStore((s) => s.careerGoals);
    const resume = useResumeStore()

    const [text, setText] = useState(existing || '');
    const [error, setError] = useState('');

    const { start, isListening } = useVoiceInput((result) => {
        setText((prev) => prev + ' ' + result);
    });

    const handleFinish = () => {
        if (!text.trim()) {
            setError('Please describe your career goals or skip this step.');
            return;
        }

        setCareerGoals(text);
        console.log('Resume completed', resume);
    };

    return (
        <StepLayout
            step={step}
            total={total}
            onNext={handleFinish}
            onBack={back}
            onSkip={() => console.log('Skipped career goals')}
            nextLabel="Finish"
        >
            <div className="space-y-8">

                <div className="space-y-3">
                    <h2 className="text-4xl font-black tracking-tight leading-[0.9]">
                        Career Goals
                    </h2>
                    <p className="text-zinc-500 font-medium max-w-lg">
                        Опишите, куда вы хотите двигаться профессионально.
                    </p>
                </div>

                <Textarea
                    rows={6}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        if (error) setError('');
                    }}
                    className="rounded-[2rem] border-zinc-200 focus:border-black focus:ring-0 text-sm p-6 resize-none"
                    placeholder="Describe your future career aspirations..."
                />

                <button
                    onClick={start}
                    type="button"
                    className="group inline-flex items-center gap-3 px-6 h-12 rounded-full border border-zinc-200 font-bold uppercase text-xs tracking-wider hover:border-black hover:bg-white transition-all"
                >
                    <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse text-[#D6FF00]' : ''}`} />
                    {isListening ? 'Listening...' : 'Use Voice Input'}
                </button>

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