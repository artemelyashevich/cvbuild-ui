import Chat from "@/app/(authenticated)/builder/stage/ai-chat/[chatId]/Chat";
import { Card } from "@/components/ui/card";
import {
    Lightbulb,
    CheckCircle2,
    AlertCircle,
    Wand2,
    MousePointer2,
    FileSearch,
    BrainCircuit
} from "lucide-react";

export default function AiChatPage() {
    return (
        <div className="container mx-auto p-6 max-w-7xl space-y-12">

            {/* ===== Header ===== */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                <div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95]">
                        AI Интервью
                    </h1>
                    <p className="text-zinc-500 mt-3 text-lg font-medium max-w-xl">
                        Создайте профессиональное резюме через живой диалог.
                    </p>
                </div>

                <div className="
                    border border-zinc-100
                    bg-zinc-50/50
                    rounded-[2rem]
                    px-6 py-4
                    flex items-center gap-4
                    hover:bg-white
                    hover:shadow-xl
                    transition-all
                    group
                ">
                    <div className="
                        h-12 w-12
                        rounded-2xl
                        bg-white
                        flex items-center justify-center
                        shadow-sm
                        group-hover:bg-[#D6FF00]
                        group-hover:scale-110
                        transition-all
                    ">
                        <BrainCircuit className="w-6 h-6" />
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                            AI Ассистент
                        </p>
                        <p className="text-sm font-semibold">
                            Анализ в реальном времени
                        </p>
                    </div>

                    <div className="
                        ml-4
                        text-[10px]
                        uppercase
                        font-bold
                        tracking-widest
                        bg-[#D6FF00]
                        text-black
                        px-3 py-1
                        rounded-full
                    ">
                        Online
                    </div>
                </div>
            </div>

            {/* ===== Layout ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* ===== Left Sidebar ===== */}
                <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">

                    <Card className="
                        border border-zinc-100
                        bg-zinc-50/50
                        rounded-[2.5rem]
                        p-8
                        hover:bg-white
                        hover:shadow-xl
                        transition-all
                    ">
                        <div className="space-y-6">

                            <div className="flex items-center gap-3">
                                <Wand2 className="w-5 h-5" />
                                <p className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                                    Возможности AI
                                </p>
                            </div>

                            {[
                                "Улучшение текста",
                                "Генерация раздела «О себе»",
                                "Подбор ключевых навыков"
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <p className="text-sm text-zinc-600 leading-relaxed">
                                        {item}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </Card>

                </div>

                {/* ===== Chat Area ===== */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-6">

                    <div className="
                        border border-dashed border-zinc-200
                        bg-zinc-50/40
                        rounded-[2rem]
                        p-6
                        flex gap-4
                    ">
                        <AlertCircle className="w-5 h-5 mt-1 shrink-0" />
                        <p className="text-sm text-zinc-600 leading-relaxed">
                            Отвечайте максимально подробно. AI анализирует каждый ответ
                            и формирует профессиональную структуру.
                            <strong> Результат можно отредактировать вручную.</strong>
                        </p>
                    </div>

                    <div className="
                        flex-1
                        min-h-[600px]
                        border border-zinc-100
                        bg-white
                        rounded-[2.5rem]
                        overflow-hidden
                        shadow-sm
                    ">
                        <Chat />
                    </div>

                </div>

                {/* ===== Right Sidebar ===== */}
                <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">

                    <Card className="
                        border border-zinc-100
                        bg-zinc-50/50
                        rounded-[2.5rem]
                        p-8
                        hover:bg-white
                        hover:shadow-xl
                        transition-all
                    ">
                        <div className="space-y-5">

                            <div className="flex items-center gap-3">
                                <FileSearch className="w-5 h-5" />
                                <p className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                                    Подготовка к ATS
                                </p>
                            </div>

                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Укажите ссылку на вакансию — AI добавит релевантные ключевые слова.
                            </p>

                            <p className="text-xs text-zinc-400 pt-4 border-t border-zinc-200">
                                В конце можно включить безопасный режим для 100% совместимости.
                            </p>

                        </div>
                    </Card>

                    <Card className="
                        border border-zinc-100
                        bg-zinc-50/50
                        rounded-[2.5rem]
                        p-8
                        hover:bg-white
                        hover:shadow-xl
                        transition-all
                    ">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <MousePointer2 className="w-5 h-5" />
                                <p className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                                    Свобода действий
                                </p>
                            </div>

                            <p className="text-sm text-zinc-600">
                                После интервью откроется визуальный редактор.
                                Любой блок можно изменить вручную.
                            </p>
                        </div>
                    </Card>

                    <Card className="
                        rounded-[2.5rem]
                        p-6
                        bg-[#D6FF00]
                        text-black
                        hover:brightness-105
                        transition-all
                    ">
                        <div className="flex gap-4 items-start">
                            <Lightbulb className="w-6 h-6 shrink-0" />
                            <p className="text-sm leading-relaxed">
                                Укажите страну — AI адаптирует формат (US Resume / UK CV).
                            </p>
                        </div>
                    </Card>

                </div>

            </div>
        </div>
    );
}
