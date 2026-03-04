'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useResumeStore } from "@/features/store/resume-store";
import StepLayout from "@/widgets/steps/step-layout";
import { Briefcase, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
    step: number;
    total: number;
    next: () => void;
    back: () => void;
}

export default function WorkExperienceStep({ step, total, next, back }: Props) {
    const addWork = useResumeStore((s) => s.addWorkExperience);
    const existing = useResumeStore((s) => s.workExperiences);

    const [form, setForm] = useState({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
    });

    const [experiences, setExperiences] = useState(existing || []);

    const handleAdd = () => {
        if (!form.jobTitle || !form.companyName) return;

        const newExp = { ...form, id: uuid() };
        setExperiences([...experiences, newExp]);
        addWork(newExp);

        setForm({
            jobTitle: '',
            companyName: '',
            startDate: '',
            endDate: '',
        });
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
                        <Briefcase className="w-4 h-4" />
                        Professional Background
                    </div>

                    <h2 className="text-4xl font-black tracking-tight leading-[0.9]">
                        Work Experience
                    </h2>

                    <p className="text-zinc-500 font-medium max-w-lg">
                        Добавьте ваш профессиональный опыт. Можно указать несколько позиций.
                    </p>
                </div>

                {/* FORM BLOCK */}
                <div className="border border-zinc-100 bg-zinc-50/50 rounded-[2.5rem] p-8 shadow-sm space-y-4">

                    <Input
                        placeholder="Job Title"
                        value={form.jobTitle}
                        onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                        className="h-14 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 px-6"
                    />

                    <Input
                        placeholder="Company Name"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="h-14 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 px-6"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="date"
                            placeholder="Start Date"
                            value={form.startDate}
                            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                            className="h-14 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 px-4"
                        />
                        <Input
                            type="date"
                            placeholder="End Date"
                            value={form.endDate}
                            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                            className="h-14 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 px-4"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleAdd}
                        className="group inline-flex items-center gap-3 px-6 h-14 rounded-full bg-[#D6FF00] text-black font-black uppercase text-xs tracking-wider hover:brightness-105 active:scale-95 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Add Experience
                    </button>

                </div>

                {/* LIST OF EXPERIENCES */}
                {experiences.length > 0 && (
                    <div className="space-y-4">
                        {experiences.map((exp, index) => (
                            <Card
                                key={exp.id}
                                className="relative overflow-hidden border border-zinc-100 bg-white rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                            >
                                <div className="absolute -right-4 -bottom-10 text-[6rem] font-black text-zinc-100 select-none leading-none">
                                    0{index + 1}
                                </div>
                                <CardContent className="relative z-10 p-6">
                                    <p className="font-bold text-lg tracking-tight">{exp.jobTitle}</p>
                                    <p className="text-sm text-zinc-500 font-medium">{exp.companyName}</p>
                                    <p className="text-xs text-zinc-400 font-medium">
                                        {exp.startDate || '—'} — {exp.endDate || 'Present'}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

            </div>
        </StepLayout>
    );
}