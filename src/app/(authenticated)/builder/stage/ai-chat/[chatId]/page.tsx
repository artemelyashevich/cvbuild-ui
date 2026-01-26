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
    BrainCircuit,
    ArrowRight
} from "lucide-react";

export default function AiChatPage() {
    return (
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        AI Интервьюер
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Создайте профессиональное резюме через живой диалог
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-secondary/30 p-2 rounded-2xl border">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-background bg-blue-500 flex items-center justify-center">
                            <BrainCircuit className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="text-sm pr-2">
                        <p className="font-medium leading-none">AI Ассистент</p>
                        <p className="text-[10px] text-muted-foreground">Анализ в реальном времени</p>
                    </div>
                    <Badge variant="outline" className="bg-green-500/5 text-green-600 border-green-500/20 animate-pulse">
                        Online
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Sidebar: Roadmap */}
                <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
                    <Card className="border-primary/10 shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Wand2 className="w-4 h-4 text-primary" /> Возможности AI
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex gap-3">
                                <div className="mt-1 bg-primary/10 p-1 rounded">
                                    <CheckCircle2 className="w-3 h-3 text-primary" />
                                </div>
                                <p className="leading-tight text-muted-foreground">
                                    <strong className="text-foreground block">Улучшение текста</strong>
                                    Бот перефразирует ваши ответы в бизнес-стиле.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 bg-primary/10 p-1 rounded">
                                    <CheckCircle2 className="w-3 h-3 text-primary" />
                                </div>
                                <p className="leading-tight text-muted-foreground">
                                    <strong className="text-foreground block">Генерация &#34;О себе&#34;</strong>
                                    Создаст цепляющее Summary на основе вашего опыта.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 bg-primary/10 p-1 rounded">
                                    <CheckCircle2 className="w-3 h-3 text-primary" />
                                </div>
                                <p className="leading-tight text-muted-foreground">
                                    <strong className="text-foreground block">Подбор навыков</strong>
                                    Выделит ключевые компетенции для вашей роли.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Chat Area */}
                <div className="col-span-1 lg:col-span-6 flex flex-col gap-4">
                    <div className="bg-accent/30 rounded-xl p-4 border border-dashed border-primary/20 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            Отвечайте на вопросы максимально подробно. AI проанализирует каждое слово, чтобы построить идеальную структуру.
                            <strong> Вы всегда сможете поправить результат вручную.</strong>
                        </p>
                    </div>
                    <div className="flex-1 bg-card border rounded-2xl shadow-xl overflow-hidden min-h-[600px]">
                        <Chat />
                    </div>
                </div>

                {/* Right Sidebar: Expert Tips */}
                <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
                    <Card className="bg-blue-500/[0.03] border-blue-500/20 shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <FileSearch className="w-4 h-4 text-blue-500" /> Подготовка к ATS
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs space-y-4 leading-relaxed">
                            <p>Большинство компаний используют системы автоматического сканирования резюме (ATS).</p>
                            <ul className="space-y-2">
                                <li className="flex gap-2">
                                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                    <span>Укажите ссылку на описание вакансии, чтобы AI добавил нужные ключевые слова.</span>
                                </li>
                                <li className="flex gap-2">
                                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                    <span>Для ATS лучше всего подходят форматы .png или .jpg для фото.</span>
                                </li>
                            </ul>
                            <div className="pt-2 border-t border-blue-500/10">
                                <p className="italic text-blue-600/70 text-[10px]">
                                    * В конце мы предложим включить "Безопасный режим" для 100% чтения роботами.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <MousePointer2 className="w-4 h-4 text-orange-500" /> Свобода действий
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs text-muted-foreground space-y-3 bg-orange-500/[0.02]">
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

                    <Card className="border-none bg-gradient-to-br from-primary/5 to-primary/10">
                        <CardContent className="p-4 flex items-center gap-4 text-xs">
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