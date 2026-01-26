'use client'

import React, {FormEvent} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {
    MessageSquare,
    Sparkles,
    LayoutTemplate,
    Download,
    ChevronRight,
    CheckCircle2
} from "lucide-react";
import useCreateChat from "@/features/hooks/use-create-chat";
import {useRouter} from "next/navigation";

export default function AiWelcomePage() {
    const {mutateAsync, loading, chatContent} = useCreateChat();
    const {push} = useRouter();
    const steps = [
        {
            title: "Интервью с AI",
            description: "Бот задаст вопросы о вашем опыте, навыках и целях. Это займет около 5-10 минут.",
            icon: <MessageSquare className="w-6 h-6 text-blue-500"/>,
            cost: "Бесплатно"
        },
        {
            title: "Генерация контента",
            description: "AI составит профессиональные описания, адаптирует текст под ATS и вашу вакансию.",
            icon: <Sparkles className="w-6 h-6 text-purple-500"/>,
            cost: "1 поинт"
        },
        {
            title: "Дизайн и Правки",
            description: "Выбирайте шаблоны, меняйте цвета и редактируйте текст вручную без ограничений.",
            icon: <LayoutTemplate className="w-6 h-6 text-orange-500"/>,
            cost: "Бесплатно"
        },
        {
            title: "Экспорт",
            description: "Скачивайте готовое резюме в PDF или других форматах, готовое к отправке рекрутеру.",
            icon: <Download className="w-6 h-6 text-green-500"/>,
            cost: "Включено"
        }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl w-full space-y-12">

                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Ваше идеальное резюме <br/>
                        <span className="text-primary">начинается здесь</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Мы объединили мощь ИИ и лучшие практики рекрутинга, чтобы вы получили оффер мечты.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {steps.map((step, index) => (
                        <Card key={index} className="border-none bg-accent/30 hover:bg-accent/50 transition-colors">
                            <CardContent className="p-6 flex gap-4">
                                <div className="shrink-0 p-3 bg-background rounded-xl shadow-sm h-fit">
                                    {step.icon}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg">{step.title}</h3>
                                        <span
                                            className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-background px-2 py-0.5 rounded border">
                                            {step.cost}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div
                    className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                    <div className="space-y-2 text-center md:text-left">
                        <h4 className="font-bold flex items-center justify-center md:justify-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary"/>
                            Поддержка ATS-стандартов
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            На этапе дизайна вы сможете включить &#34;ATS-режим&#34;. Мы подберем структуру и шрифты,
                            которые гарантированно распознаются алгоритмами крупных компаний.
                        </p>
                    </div>
                    <form onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        try {
                            const data = await mutateAsync();
                            if (data?.id) {
                                push(`/builder/stage/ai-chat/${data.id}`);
                            }
                        } catch (e) {
                            console.error(e as Error);
                        }
                    }} className="shrink-0">
                        <button type={"submit"}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                            {loading ? "Loading" : "Начать интервью"}
                            <ChevronRight className="w-5 h-5"/>
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                    Нажимая «Начать», вы переходите в чат с AI-ассистентом. <br/>
                    Списание поинтов произойдет только в момент подтверждения текста резюме.
                </p>
            </div>
        </div>
    );
}