'use client'

import ResumePreview from "@/widgets/resume/resume-preview";
import TemplateSelector from "@/widgets/template/template-selector";
import { TemplateForm } from "@/widgets/template/create-template-form";
import { LayoutTemplate, Sparkles } from "lucide-react";

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-white text-zinc-950 flex flex-col items-center p-6 md:p-12 font-sans selection:bg-[#D6FF00] selection:text-black">
            <div className="max-w-5xl w-full space-y-12">

                <div className="text-center space-y-6 mt-4 md:mt-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] select-none">
                        Идеальное резюме <br/>
                        <span className="relative inline-block mt-2">
                            <span className="absolute inset-0 bg-[#D6FF00] -rotate-1 skew-x-3 rounded-lg -z-10"/>
                            <span className="relative px-4 text-black">
                                Начинается здесь
                            </span>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto tracking-tight leading-relaxed">
                        Выберите или создайте <span className="text-black font-bold underline decoration-[#D6FF00] decoration-4 underline-offset-4">идеальный шаблон</span> для вашего будущего резюме.
                    </p>
                </div>

                {/* Секция создания нового шаблона */}
                <div className="bg-white rounded-[3rem] p-4 md:p-6 lg:p-8 border border-zinc-100 shadow-sm">
                    <TemplateForm />
                </div>

                {/* Секция выбора шаблона */}
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.85] text-center md:text-left">
                        <span className="relative inline-block">
                            <span className="absolute inset-0 bg-[#D6FF00] -rotate-1 skew-x-3 rounded-lg -z-10"/>
                            <span className="relative px-4 text-black">
                                Выберите шаблон
                            </span>
                        </span>
                    </h2>
                    <TemplateSelector />
                </div>

                <div className="bg-zinc-900 rounded-[3rem] p-2 md:p-3 flex flex-col md:flex-row gap-6 items-center shadow-2xl">
                    <div className="flex-1 px-6 py-4 md:py-2 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-[#D6FF00] font-bold uppercase tracking-widest text-xs mb-1">
                            <Sparkles className="w-3 h-3 fill-[#D6FF00]"/>
                            Предварительный просмотр
                        </div>
                        <p className="text-zinc-400 text-sm font-medium">
                            Посмотрите, как ваше резюме будет выглядеть с выбранным шаблоном.
                        </p>
                    </div>
                    <div className="w-full md:w-auto shrink-0">
                        <div
                            className="group relative w-full md:w-auto bg-[#D6FF00] text-black h-16 md:h-20 px-12 rounded-[2.5rem] font-black uppercase tracking-wider text-sm md:text-base flex items-center justify-center gap-3 transition-all overflow-hidden"
                        >
                            <span className="relative flex items-center gap-3">
                                <LayoutTemplate className="h-5 w-5"/>
                                Ваше резюме здесь
                            </span>
                        </div>
                    </div>
                </div>

                <ResumePreview />

                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-bold hover:text-zinc-400 transition-colors cursor-help">
                    Дизайн и функциональность вдохновлены лучшими практиками
                </p>
            </div>
        </div>
    );
}