'use client'

import React, {FormEvent} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {
    MessageSquare,
    Sparkles,
    LayoutTemplate,
    Download,
    ChevronRight,
    Star,
    Loader2
} from "lucide-react";
import useCreateChat from "@/features/hooks/use-create-chat";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import useAgree from "@/features/hooks/use-agree";

export default function AiWelcomePage() {
    const {mutateAsync, loading} = useCreateChat();
    const {mutateAsync: agree, loading: agreeLoading} = useAgree()
    const {push} = useRouter();

    const steps = [
        {
            title: "Интервью с AI",
            description: "Бот задаст вопросы о вашем опыте. 5-10 минут.",
            icon: <MessageSquare className="w-6 h-6"/>,
            badge: "Free",
            highlight: false
        },
        {
            title: "Генерация",
            description: "Профессиональные описания и адаптация под ATS.",
            icon: <Sparkles className="w-6 h-6"/>,
            badge: "1 Point",
            highlight: true // Visually distinct
        },
        {
            title: "Дизайн",
            description: "Выбор шаблонов и ручное редактирование.",
            icon: <LayoutTemplate className="w-6 h-6"/>,
            badge: "Free",
            highlight: false
        },
        {
            title: "Экспорт",
            description: "PDF готов к отправке рекрутеру.",
            icon: <Download className="w-6 h-6"/>,
            badge: "Included",
            highlight: false
        }
    ];

    return (
        <div
            className="min-h-screen bg-white text-zinc-950 flex flex-col items-center justify-center p-6 md:p-12 font-sans selection:bg-[#D6FF00] selection:text-black">
            <div className="max-w-5xl w-full space-y-12">

                {/* --- Header Section --- */}
                <div
                    className="text-center space-y-6 mt-4 md:mt-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                        Объединяем мощь AI и эстетику дизайна, чтобы вы получили <span
                        className="text-black font-bold underline decoration-[#D6FF00] decoration-4 underline-offset-4">оффер мечты</span>.
                    </p>
                </div>

                {/* --- Cards Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {steps.map((step, index) => (
                        <Card
                            key={index}
                            className="relative overflow-hidden border border-zinc-100 bg-zinc-50/50 shadow-sm rounded-[2.5rem] hover:bg-white hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            {/* Giant Background Number */}
                            <div
                                className="absolute -right-4 -bottom-10 text-[10rem] font-black text-zinc-100 group-hover:text-zinc-50 select-none transition-colors pointer-events-none z-0 leading-none">
                                0{index + 1}
                            </div>

                            <CardContent
                                className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[220px]">
                                <div className="flex justify-between items-start">
                                    <div className={cn(
                                        "p-4 rounded-2xl transition-all duration-300",
                                        "bg-white text-black shadow-sm group-hover:bg-[#D6FF00] group-hover:shadow-md group-hover:scale-110"
                                    )}>
                                        {step.icon}
                                    </div>
                                    <span className={cn(
                                        "px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border",
                                        step.highlight
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-zinc-500 border-zinc-200"
                                    )}>
                                        {step.badge}
                                    </span>
                                </div>

                                <div className="space-y-2 mt-6">
                                    <h3 className="font-bold text-2xl tracking-tight">{step.title}</h3>
                                    <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-[85%]">
                                        {step.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <form onSubmit={async e => {
                    e.preventDefault();
                    try {
                        await agree()
                        toast.message("Your are confirmed agreement!")
                    } catch (e) {
                        console.error(e as Error);
                        toast.error("Для этого действия необходоимо верифицировать почту")
                    }
                }}>
                    <Button type={"submit"}><span>Разрешить обработку персональных данных</span></Button>
                </form>

                {/* --- Bottom Action Section --- */}
                <div
                    className="bg-zinc-900 rounded-[3rem] p-2 md:p-3 flex flex-col md:flex-row gap-6 items-center shadow-2xl shadow-zinc-200">

                    {/* Information Block */}
                    <div className="flex-1 px-6 py-4 md:py-2 text-center md:text-left">
                        <div
                            className="flex items-center justify-center md:justify-start gap-2 text-[#D6FF00] font-bold uppercase tracking-widest text-xs mb-1">
                            <Star className="w-3 h-3 fill-[#D6FF00]"/>
                            ATS-Friendly Mode
                        </div>
                        <p className="text-zinc-400 text-sm font-medium">
                            Гарантированная читаемость алгоритмами.
                        </p>
                    </div>


                    {/* Action Button */}
                    <form
                        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            try {
                                const data = await mutateAsync();
                                if (data?.id) {
                                    push(`/builder/stage/ai-chat/${data.id}`);
                                }
                            } catch (e) {
                                console.error(e as Error);
                                toast.error("Вам необходимо предоставить разрешение на обработку персональных данных")
                            }
                        }}
                        className="w-full md:w-auto shrink-0"
                    >
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full md:w-auto bg-[#D6FF00] text-black h-16 md:h-20 px-12 rounded-[2.5rem] font-black uppercase tracking-wider text-sm md:text-base flex items-center justify-center gap-3 transition-all hover:brightness-105 active:scale-95 overflow-hidden"
                        >
                            {/* Button Hover Glow Effect */}
                            <div
                                className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-[2.5rem]"/>

                            <span className="relative flex items-center gap-3">
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin"/>
                                        Создаем чат...
                                    </>
                                ) : (
                                    <>
                                        Начать интервью
                                        <div
                                            className="bg-black text-[#D6FF00] rounded-full p-1 transition-transform group-hover:translate-x-1">
                                            <ChevronRight className="w-4 h-4 stroke-[4]"/>
                                        </div>
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                </div>

                {/* Footer Disclaimer */}
                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-bold hover:text-zinc-400 transition-colors cursor-help">
                    Поинты списываются только после утверждения текста
                </p>
            </div>
        </div>
    );
}