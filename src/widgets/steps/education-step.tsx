'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { v4 as uuid } from 'uuid';
import { useResumeStore } from "@/features/store/resume-store";
import StepLayout from "@/widgets/steps/step-layout";
import { Trash2, Plus } from 'lucide-react';

interface Props {
    step: number;
    total: number;
    next: () => void;
    back: () => void;
}

export default function EducationStep({ step, total, next, back }: Props) {
    const education = useResumeStore((s) => s.education);
    const addEducation = useResumeStore((s) => s.addEducation);
    const removeEducation = useResumeStore((s) => s.removeEducation);

    const [form, setForm] = useState({
        schoolName: '',
        degree: '',
        startDate: '',
        endDate: '',
    });

    const handleAdd = () => {
        if (!form.schoolName || !form.degree) return;

        addEducation({
            ...form,
            id: uuid(),
        });

        setForm({
            schoolName: '',
            degree: '',
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
                    <h2 className="text-4xl font-black tracking-tight leading-[0.9]">
                        Education
                    </h2>
                    <p className="text-zinc-500 font-medium max-w-lg">
                        Добавьте ваше образование. Можно указать несколько учебных заведений.
                    </p>
                </div>

                {/* FORM BLOCK */}
                <div className="relative border border-zinc-100 bg-zinc-50/50 rounded-[2.5rem] p-8 space-y-6 shadow-sm">

                    <div>
                        <Label className="uppercase text-xs tracking-widest font-bold text-zinc-400">
                            School / University
                        </Label>
                        <Input
                            className="mt-2 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 h-12"
                            value={form.schoolName}
                            onChange={(e) =>
                                setForm({ ...form, schoolName: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <Label className="uppercase text-xs tracking-widest font-bold text-zinc-400">
                            Degree
                        </Label>
                        <Input
                            className="mt-2 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 h-12"
                            placeholder="Bachelor of Computer Science"
                            value={form.degree}
                            onChange={(e) =>
                                setForm({ ...form, degree: e.target.value })
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="uppercase text-xs tracking-widest font-bold text-zinc-400">
                                Start Date
                            </Label>
                            <Input
                                type="date"
                                className="mt-2 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 h-12"
                                value={form.startDate}
                                onChange={(e) =>
                                    setForm({ ...form, startDate: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <Label className="uppercase text-xs tracking-widest font-bold text-zinc-400">
                                End Date
                            </Label>
                            <Input
                                type="date"
                                className="mt-2 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 h-12"
                                value={form.endDate}
                                onChange={(e) =>
                                    setForm({ ...form, endDate: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* ADD BUTTON */}
                    <button
                        onClick={handleAdd}
                        disabled={!form.schoolName || !form.degree}
                        type="button"
                        className="group mt-2 inline-flex items-center gap-3 px-6 h-12 rounded-full bg-[#D6FF00] text-black font-black uppercase tracking-wider text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 active:scale-95 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Add Education
                    </button>
                </div>

                {/* LIST */}
                {education.length > 0 && (
                    <div className="space-y-4">

                        <div className="text-xs uppercase tracking-widest font-bold text-zinc-400">
                            Added
                        </div>

                        {education.map((edu, index) => (
                            <Card
                                key={edu.id}
                                className="relative overflow-hidden border border-zinc-100 bg-white rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                            >
                                <div className="absolute -right-4 -bottom-10 text-[6rem] font-black text-zinc-100 select-none leading-none">
                                    0{index + 1}
                                </div>

                                <CardContent className="relative z-10 p-6 flex justify-between items-center">

                                    <div className="space-y-1">
                                        <p className="font-bold text-lg tracking-tight">
                                            {edu.schoolName}
                                        </p>
                                        <p className="text-sm text-zinc-500 font-medium">
                                            {edu.degree}
                                        </p>
                                        <p className="text-xs text-zinc-400 font-medium">
                                            {edu.startDate || '—'} — {edu.endDate || 'Present'}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeEducation(edu.id)}
                                        className="group p-3 rounded-full hover:bg-red-50 transition"
                                    >
                                        <Trash2 className="w-4 h-4 text-zinc-400 group-hover:text-red-500 transition" />
                                    </button>

                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

            </div>
        </StepLayout>
    );
}