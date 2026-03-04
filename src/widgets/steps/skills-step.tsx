'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useResumeStore } from "@/features/store/resume-store";
import StepLayout from "@/widgets/steps/step-layout";
import { Sparkles, Plus, X } from "lucide-react";

interface Props {
    step: number;
    total: number;
    next: () => void;
    back: () => void;
}

export default function SkillsStep({ step, total, next, back }: Props) {
    const setSkills = useResumeStore((s) => s.setSkills);
    const existing = useResumeStore((s) => s.skills);

    const [skills, setLocalSkills] = useState<string[]>(existing || []);
    const [input, setInput] = useState('');

    const addSkill = () => {
        if (!input.trim()) return;
        if (skills.includes(input.trim())) return;

        const newSkills = [...skills, input.trim()];
        setLocalSkills(newSkills);
        setSkills(newSkills);
        setInput('');
    };

    const removeSkill = (skill: string) => {
        const updated = skills.filter((s) => s !== skill);
        setLocalSkills(updated);
        setSkills(updated);
    };

    return (
        <StepLayout
            step={step}
            total={total}
            onNext={next}
            onBack={back}
            onSkip={next}
            nextLabel="Continue"
        >
            <div className="space-y-10">

                {/* HEADER */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#D6FF00] font-bold uppercase tracking-widest text-xs">
                        <Sparkles className="w-4 h-4" />
                        Core Strengths
                    </div>

                    <h2 className="text-4xl font-black tracking-tight leading-[0.9]">
                        Your Skills
                    </h2>

                    <p className="text-zinc-500 font-medium max-w-lg">
                        Добавьте ключевые навыки. Они влияют на ATS-матчинг и
                        видимость вашего резюме.
                    </p>
                </div>

                {/* INPUT BLOCK */}
                <div className="border border-zinc-100 bg-zinc-50/50 rounded-[2.5rem] p-8 shadow-sm space-y-6">

                    <div className="flex gap-3">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                            placeholder="e.g. React, TypeScript, Product Strategy..."
                            className="h-14 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 text-sm px-6"
                        />

                        <button
                            type="button"
                            onClick={addSkill}
                            className="group bg-[#D6FF00] text-black h-14 px-6 rounded-full font-black uppercase text-xs tracking-wider flex items-center gap-2 hover:brightness-105 active:scale-95 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Add
                        </button>
                    </div>

                    <div className="text-xs uppercase tracking-widest font-bold text-zinc-400">
                        Press Enter or click Add
                    </div>

                </div>

                {/* SKILLS LIST */}
                {skills.length > 0 && (
                    <div className="flex flex-wrap gap-3">

                        {skills.map((skill, i) => (
                            <div
                                key={i}
                                className="group flex items-center gap-2 px-5 h-11 rounded-full bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                            >
                                <span className="text-sm font-bold tracking-tight">
                                    {skill}
                                </span>

                                <button
                                    onClick={() => removeSkill(skill)}
                                    className="opacity-40 group-hover:opacity-100 transition"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </StepLayout>
    );
}