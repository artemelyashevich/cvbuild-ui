'use client';

import { useState, useEffect } from 'react';
import StepLayout from "@/widgets/steps/step-layout";
import { Input } from '@/components/ui/input';
import { useResumeStore } from "@/features/store/resume-store";
import { v4 as uuid } from 'uuid';
import {useVoiceInput} from "@/features";

export interface ResumeQuestion {
    field: string;
    question: string;
}

export interface ResumeStepData {
    questions: ResumeQuestion[];
    voiceInput: boolean;
}

interface Props {
    stepIndex: number;
    total: number;
    next: () => void;
    back: () => void;
    categoryName: string;
    stepData: ResumeStepData;
}

export default function CategoryStep({ stepIndex, total, next, back, categoryName, stepData }: Props) {
    const { questions, voiceInput } = stepData;
    const resume = useResumeStore();

    const [form, setForm] = useState<Record<string, string>>({});

    const { start, isListening } = useVoiceInput((text: string) => {
        if (questions.length > 0) {
            const lastField = questions[0].field;
            setForm((prev) => ({ ...prev, [lastField]: text }));
        }
    });

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        questions.forEach((q) => {
            const val = form[q.field] || '';
            switch (q.field) {
                // Personal Information
                case 'FIRST_NAME': resume.setFirstName(val); break;
                case 'LAST_NAME': resume.setLastName(val); break;
                case 'EMAIL': resume.setEmail(val); break;
                case 'PHONE': resume.setPhone(val); break;

                // Links
                case 'LINKEDIN': resume.setLinkedin(val); break;
                case 'GITHUB': resume.setGithub(val); break;
                case 'PORTFOLIO': resume.setPortfolio(val); break;

                // Job
                case 'COMPANY':
                case 'POSITION':
                case 'JOB_PERIOD':
                case 'RESPONSIBILITIES':
                case 'ACHIEVEMENTS':
                    resume.addWorkExperience({
                        id: uuid(),
                        jobTitle: form['POSITION'] || '',
                        companyName: form['COMPANY'] || '',
                        startDate: form['JOB_PERIOD']?.split('-')[0] || '',
                        endDate: form['JOB_PERIOD']?.split('-')[1] || '',
                    });
                    break;

                // Education
                case 'UNIVERSITY':
                case 'DEGREE':
                case 'FIELD_OF_STUDY':
                case 'EDUCATION_PERIOD':
                    resume.addEducation({
                        id: uuid(),
                        schoolName: form['UNIVERSITY'] || '',
                        degree: form['DEGREE'] || '',
                        startDate: form['EDUCATION_PERIOD']?.split('-')[0] || '',
                        endDate: form['EDUCATION_PERIOD']?.split('-')[1] || '',
                    });
                    break;

                // Skills / Highlights / Career
                case 'SKILL': resume.setSkills(val.split(',').map((s) => s.trim())); break;
                case 'HIGHLIGHT': resume.setHighlights(val); break;
                case 'CAREER_GOAL': resume.setCareerGoals(val); break;
            }
        });
        next();
    };

    useEffect(() => {
        setForm({});
    }, [stepIndex]);

    return (
        <StepLayout
            step={stepIndex + 1}
            total={total}
            onNext={handleSave}
            onBack={back}
            onSkip={next}
            nextLabel="Continue"
        >
            <div className="flex flex-col space-y-4">
                {voiceInput && (
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-zinc-400">🎤 Вы можете использовать голосовой ввод для этого шага</span>
                        <button
                            type="button"
                            onClick={start}
                            className={`px-3 py-1 rounded-md font-semibold text-white ${isListening ? 'bg-green-500' : 'bg-blue-500'}`}
                        >
                            {isListening ? 'Listening...' : 'Start Voice'}
                        </button>
                    </div>
                )}

                {questions.map((q) => (
                    <div key={q.field} className="flex flex-col">
                        <label className="font-medium text-zinc-700">{q.question}</label>
                        <Input
                            value={form[q.field] || ''}
                            onChange={(e) => handleChange(q.field, e.target.value)}
                            placeholder={q.question}
                            className="h-14 rounded-2xl border-zinc-200 focus:border-black focus:ring-0 px-6"
                        />
                    </div>
                ))}
            </div>
        </StepLayout>
    );
}