'use client';

import { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    children: ReactNode;
    step: number;
    total: number;
    onNext: () => void;
    onBack?: () => void;
    onSkip?: () => void;
    nextLabel?: string;
}

export default function StepLayout({
                                       children,
                                       step,
                                       total,
                                       onNext,
                                       onBack,
                                       onSkip,
                                       nextLabel = 'Next',
                                   }: Props) {
    const progress = (step / total) * 100;

    return (
        <div className="min-h-screen bg-white text-zinc-950 flex items-center justify-center p-6 md:p-12 font-sans">
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-3xl"
            >
                <div className="bg-zinc-50/50 border border-zinc-100 rounded-[3rem] shadow-xl p-10 md:p-14 space-y-10">

                    {/* STEP + PROGRESS HEADER */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs uppercase tracking-widest font-bold">
                            <span className="text-zinc-400">
                                Step {step} of {total}
                            </span>
                            <span className="text-black">
                                {Math.round(progress)}%
                            </span>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-zinc-200 rounded-full" />
                            <div
                                className="relative h-2 rounded-full bg-[#D6FF00] transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="space-y-6">
                        {children}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-between items-center pt-4">

                        <div className="flex gap-3">
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className="px-6 h-12 rounded-full border border-zinc-200 font-bold uppercase text-xs tracking-wider hover:border-black hover:bg-white transition-all"
                                >
                                    Back
                                </button>
                            )}

                            {onSkip && (
                                <button
                                    onClick={onSkip}
                                    className="px-6 h-12 rounded-full text-zinc-400 font-bold uppercase text-xs tracking-wider hover:text-black transition-all"
                                >
                                    Skip
                                </button>
                            )}
                        </div>

                        <button
                            onClick={onNext}
                            className="group relative bg-[#D6FF00] text-black h-14 px-10 rounded-[2.5rem] font-black uppercase tracking-wider text-sm flex items-center gap-3 hover:brightness-105 active:scale-95 transition-all overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-[2.5rem]" />

                            <span className="relative flex items-center gap-3">
                                {nextLabel}
                                <div className="bg-black text-[#D6FF00] rounded-full p-1 group-hover:translate-x-1 transition-transform">
                                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                                </div>
                            </span>
                        </button>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}