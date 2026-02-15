import Chat from "@/app/(authenticated)/builder/stage/ai-chat/[chatId]/Chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        AI Интервьюер
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl">
                        Создайте профессиональное резюме через живой диалог
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-secondary/30 p-3 rounded-2xl border border-secondary/50 transition-all hover:scale-105">
                    <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full border-2 border-background bg-blue-500 flex items-center justify-center">
                            <BrainCircuit className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <div className="text-sm pr-2">
                        <p className="font-medium leading-none">AI Ассистент</p>
                        <p className="text-[11px] text-muted-foreground">Анализ в реальном времени</p>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 animate-pulse">
                        Online
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Sidebar: Roadmap */}
                <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
                    <Card className="border-primary/10 shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Wand2 className="w-5 h-5 text-primary" /> Возможности AI
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            {[
                                { title: "Улучшение текста", desc: "Бот перефразирует ваши ответы в бизнес-стиле." },
                                { title: "Генерация \"О себе\"", desc: "Создаст цепляющее Summary на основе вашего опыта." },
                                { title: "Подбор навыков", desc: "Выделит ключевые компетенции для вашей роли." },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-start hover:bg-primary/5 p-2 rounded transition-all">
                                    <div className="mt-1 bg-primary/10 p-1.5 rounded">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    </div>
                                    <p className="leading-tight text-muted-foreground">
                                        <strong className="text-foreground block">{item.title}</strong>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Main Chat Area */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-4">
                    <div className="bg-accent/30 rounded-xl p-4 border border-dashed border-primary/20 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">
                            Отвечайте на вопросы максимально подробно. AI проанализирует каждое слово, чтобы построить идеальную структуру.
                            <strong> Вы всегда сможете поправить результат вручную.</strong>
                        </p>
                    </div>
                    <div className="flex-1 overflow-hidden min-h-[600px]">
                        <Chat />
                    </div>
                </div>

                {/* Right Sidebar: Expert Tips */}
                <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
                    <Card className="bg-blue-500/[0.03] border-blue-500/20 shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <FileSearch className="w-5 h-5 text-blue-500" /> Подготовка к ATS
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs md:text-sm space-y-4 leading-relaxed">
                            <p>Большинство компаний используют системы автоматического сканирования резюме (ATS).</p>
                            <ul className="space-y-2 pl-3 list-disc">
                                <li>Укажите ссылку на описание вакансии, чтобы AI добавил нужные ключевые слова.</li>
                                <li>Для ATS лучше всего подходят форматы .png или .jpg для фото.</li>
                            </ul>
                            <p className="italic text-blue-600/70 text-[10px] pt-2 border-t border-blue-500/10">
                                * В конце мы предложим включить &#34;Безопасный режим&#34; для 100% чтения роботами.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-all">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <MousePointer2 className="w-5 h-5 text-orange-500" /> Свобода действий
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs md:text-sm text-muted-foreground space-y-3 bg-orange-500/[0.02]">
                            <p>
                                После завершения диалога откроется <strong>Визуальный Редактор</strong>.
                            </p>
                            <div className="flex items-center gap-2 text-foreground font-medium">
                                <div className="p-1.5 bg-background border rounded">✏️</div>
                                <span>Любой блок можно будет изменить руками</span>
                            </div>
                            <p>
                                Темы, шрифты, отступы и порядок секций настраиваются в один клик.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-gradient-to-br from-primary/5 to-primary/15 hover:from-primary/10 hover:to-primary/20 transition-all">
                        <CardContent className="p-4 flex items-center gap-4 text-xs md:text-sm">
                            <Lightbulb className="w-8 h-8 text-yellow-500 shrink-0" />
                            <p className="leading-tight">
                                <strong>Совет:</strong> Если вы хотите работать за рубежом, укажите целевую страну. AI адаптирует стандарты оформления (например, US Resume vs UK CV).
                            </p>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
