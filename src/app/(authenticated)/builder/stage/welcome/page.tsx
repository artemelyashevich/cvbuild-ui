'use client'

import React, { FormEvent, useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
    MessageSquare,
    Sparkles,
    LayoutTemplate,
    Download,
    Star,
    Loader2,
    CheckCircle2,
    ShieldAlert
} from "lucide-react";
import useCreateChat from "@/features/hooks/use-create-chat";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useAgree from "@/features/hooks/use-agree";
import { PopupSelector } from "@/widgets";
import useSettings from "@/features/hooks/use-settings";

// Выносим константы за компонент
const STEPS = [
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
        highlight: true
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

export default function AiWelcomePage() {
    const { mutateAsync: createChat } = useCreateChat();
    const { mutateAsync: agree, loading: agreeLoading } = useAgree();
    const { push } = useRouter();
    const { data: settings, loading: settingsLoading, refresh } = useSettings(); // Предположим, есть refresh или mutate

    const [popupOpen, setPopupOpen] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);

    // Локальное состояние для мгновенного фидбека (оптимистичный UI)
    const [localAgree, setLocalAgree] = useState(false);

    useEffect(() => {
        if (settings?.agree) setLocalAgree(true);
    }, [settings?.agree]);

    const handleStartClick = () => {
        if (!localAgree) {
            toast.error("Пожалуйста, подтвердите согласие на обработку данных");
            // Прокрутка к кнопке согласия
            document.getElementById('agree-section')?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        setPopupOpen(true);
    };

    const handleGoToChat = async () => {
        setChatLoading(true);
        try {
            const res = await createChat();
            push(res?.id ? `/builder/stage/ai-chat/${res.id}` : `/builder/stage/ai-chat/new-chat`);
        } catch (e) {
            toast.error("Ошибка при создании чата.");
        } finally {
            setPopupOpen(false);
            setChatLoading(false);
        }
    };

    const handleGoToForm = () => {
        push('/builder/stage/flow');
        setPopupOpen(false);
    };

    const handleAgreeSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await agree();
            setLocalAgree(true); // Обновляем локально
            toast.success("Ваше согласие подтверждено!");
            if (refresh) refresh(); // Обновляем глобальные настройки, если хук позволяет
        } catch (e) {
            toast.error("Для этого действия необходимо верифицировать почту");
        }
    };

    if (settingsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-[#D6FF00] stroke-[3px]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-950 flex flex-col items-center justify-center p-6 md:p-12 font-sans selection:bg-[#D6FF00] selection:text-black">
            <div className="max-w-5xl w-full space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] select-none">
                        Идеальное резюме <br/>
                        <span className="relative inline-block mt-2">
                            <span className="absolute inset-0 bg-[#D6FF00] -rotate-1 skew-x-3 rounded-lg -z-10"/>
                            <span className="relative px-4 text-black">Начинается здесь</span>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto tracking-tight">
                        Объединяем мощь AI и эстетику дизайна, чтобы вы получили <span className="text-black font-bold underline decoration-[#D6FF00] decoration-4 underline-offset-4">оффер мечты</span>.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {STEPS.map((step, index) => (
                        <Card key={index} className="relative overflow-hidden border border-zinc-100 bg-zinc-50/50 shadow-sm rounded-[2.5rem] hover:bg-white hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="absolute -right-4 -bottom-10 text-[10rem] font-black text-zinc-100 group-hover:text-zinc-50 select-none transition-colors pointer-events-none z-0 leading-none">
                                0{index + 1}
                            </div>
                            <CardContent className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[220px]">
                                <div className="flex justify-between items-start">
                                    <div className="p-4 rounded-2xl bg-white text-black shadow-sm group-hover:bg-[#D6FF00] group-hover:scale-110 transition-all duration-300">
                                        {step.icon}
                                    </div>
                                    <span className={cn(
                                        "px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-colors",
                                        step.highlight ? "bg-black text-white border-black" : "bg-white text-zinc-500 border-zinc-200"
                                    )}>
                                        {step.badge}
                                    </span>
                                </div>
                                <div className="space-y-2 mt-6">
                                    <h3 className="font-bold text-2xl tracking-tight">{step.title}</h3>
                                    <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-[85%]">{step.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Consent Section */}
                <form id="agree-section" onSubmit={handleAgreeSubmit} className="text-center space-y-4 py-4">
                    <Button
                        type="submit"
                        disabled={agreeLoading || localAgree}
                        className={cn(
                            "relative h-14 px-8 rounded-2xl font-bold uppercase tracking-tight transition-all duration-500 flex items-center gap-3 mx-auto overflow-hidden group",
                            localAgree
                                ? "bg-zinc-950 text-white cursor-default"
                                : "bg-white border-2 border-zinc-200 text-zinc-500 hover:border-black hover:text-black hover:shadow-xl active:scale-95"
                        )}
                    >
                        {!localAgree && (
                            <div className="absolute inset-0 bg-[#D6FF00] translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
                        )}

                        <div className="relative z-10 flex items-center gap-3">
                            {agreeLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : localAgree ? (
                                <>
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D6FF00]">
                                        <CheckCircle2 className="w-4 h-4 text-black" />
                                    </div>
                                    <span>Согласие подтверждено</span>
                                </>
                            ) : (
                                <>
                                    <ShieldAlert className="w-5 h-5 group-hover:text-black transition-colors" />
                                    <span>Дать согласие на обработку</span>
                                </>
                            )}
                        </div>
                    </Button>
                    <p className="text-[10px] text-zinc-400 max-w-xs mx-auto leading-tight uppercase font-bold tracking-widest">
                        Ваши данные защищены. AI использует их только для формирования текста резюме.
                    </p>
                </form>

                {/* CTA Section */}
                <div className="bg-zinc-900 rounded-[3rem] p-2 md:p-3 flex flex-col md:flex-row gap-6 items-center shadow-2xl transition-transform hover:scale-[1.01]">
                    <div className="flex-1 px-6 py-4 md:py-2 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-[#D6FF00] font-bold uppercase tracking-widest text-xs mb-1">
                            <Star className="w-3 h-3 fill-[#D6FF00]"/>
                            ATS-Friendly Mode
                        </div>
                        <p className="text-zinc-400 text-sm font-medium">Гарантированная читаемость алгоритмами рекрутинга.</p>
                    </div>

                    <div className="w-full md:w-auto shrink-0">
                        <button
                            onClick={handleStartClick}
                            className={cn(
                                "group relative w-full md:w-auto h-16 md:h-20 px-12 rounded-[2.5rem] font-black uppercase tracking-wider text-sm md:text-base flex items-center justify-center gap-3 transition-all overflow-hidden",
                                localAgree
                                    ? "bg-[#D6FF00] text-black hover:brightness-105 active:scale-95"
                                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                            )}
                        >
                            {localAgree && (
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-[2.5rem]"/>
                            )}
                            <span className="relative flex items-center gap-3">
                                Начать интервью
                            </span>
                        </button>
                    </div>
                </div>

                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-300 font-bold">
                    Поинты списываются только после утверждения текста
                </p>
            </div>

            <PopupSelector
                isOpen={popupOpen}
                onClose={() => setPopupOpen(false)}
                onChat={handleGoToChat}
                onForm={handleGoToForm}
                loading={chatLoading}
            />
        </div>
    );
}