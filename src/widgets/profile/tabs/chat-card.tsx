import {Card, CardContent} from "@/components/ui/card";
import {CheckCircle2, Clock, MessageSquare} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {IChat} from "@/entities";

interface ChatCardProps {
    chat: IChat;
}

export const ChatCard = ({ chat }: ChatCardProps) => {
    const firstUserMessage = chat.messages.find(m => m.role === 'user');

    const displayTitle = firstUserMessage
        ? (firstUserMessage.content.length > 40
            ? firstUserMessage.content.slice(0, 40) + "..."
            : firstUserMessage.content)
        : `Диалог от ${new Date(chat.updatedAt).toLocaleDateString()}`;

    return (
        <Card className="
            relative overflow-hidden
            border border-zinc-100
            bg-zinc-50/50
            rounded-[2.5rem]
            p-8
            hover:bg-white
            hover:border-black
            hover:shadow-xl
            hover:-translate-y-1
            transition-all duration-300
            group
            flex flex-col justify-between
            h-full
        ">
            <div className="absolute -right-2 -bottom-6 text-[6rem] font-black text-zinc-100 group-hover:text-zinc-50 transition-colors select-none pointer-events-none">
                AI
            </div>

            <CardContent className="relative z-10 p-0 space-y-6">
                <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                        {chat.templateId ? `Шаблон: ${chat.templateId}` : "AI Assistant"}
                    </span>
                    {chat.finished ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                        <MessageSquare className="h-5 w-5 text-zinc-400 group-hover:text-black transition-colors" />
                    )}
                </div>

                <div>
                    <h3 className="text-xl font-black tracking-tight line-clamp-2 min-h-[3.5rem]">
                        {displayTitle}
                    </h3>

                    <div className="flex items-center gap-2 mt-3 text-xs text-zinc-400 font-medium uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {new Date(chat.updatedAt).toLocaleString("ru-RU", {
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                        })}
                    </div>
                </div>

                <Link href={`/builder/stage/ai-chat/${chat.id}`} className="block mt-auto">
                    <Button
                        variant="outline"
                        className="
                            w-full
                            rounded-2xl
                            border-zinc-200
                            bg-white
                            font-bold
                            uppercase
                            tracking-widest
                            text-xs
                            hover:border-black
                            hover:bg-[#D6FF00]
                            hover:text-black
                            h-10
                        "
                    >
                        {chat.finished ? "Посмотреть итог" : "Продолжить"}
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};