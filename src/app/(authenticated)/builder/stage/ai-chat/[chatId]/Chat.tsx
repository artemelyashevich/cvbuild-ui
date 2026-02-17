"use client";

import React, {useState, useEffect, useRef, useCallback} from "react";
import {Send, Loader2, AlertCircle} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Cookies from "js-cookie";
import {useParams, useRouter} from "next/navigation";
import {axiosWithToken} from "@/features";
import {useChatHistory} from "@/features/hooks/useChatHistory";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888";

type Log = {
    type: "user" | "ai" | "sys";
    text: string;
};

type ChatParams = {
    chatId: string;
};

export default function Chat() {
    const {chatId} = useParams<ChatParams>();
    const router = useRouter();
    const {data, loading: historyLoading} = useChatHistory(chatId);

    const [message, setMessage] = useState<string>("");
    const [logs, setLogs] = useState<Log[]>([
        {type: "ai", text: "Привет! Я помогу тебе создать резюме! Начнем?"},
    ]);

    const [isThinking, setIsThinking] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const logEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (data?.messages && Array.isArray(data.messages)) {
            const historyLogs: Log[] = data.messages.map((msg: any) => {
                if (msg.content.includes("INTERVIEW_COMPLETED")) {
                    setIsCompleted(true);
                }
                return {
                    type: msg.role === "USER" ? "user" : "ai",
                    text: msg.content,
                }
            });

            if (historyLogs.length > 0) {
                setLogs(historyLogs);
            }
        }
    }, [data]);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [logs, isThinking]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    const handleGenerateResume = async () => {
        try {
            const response = await axiosWithToken.post(`/test/generate/${chatId}`);
            if (response.data?.id) {
                router.push(`/builder/stage/form/${response.data.id}`);
            }
        } catch (error) {
            console.error("Failed to generate resume:", error);
        }
    };

    const sendMessage = useCallback(async () => {
        if (!message.trim() || isThinking || isCompleted) return;

        const userMessage = message.trim();
        setLogs((prev) => [...prev, {type: "user", text: userMessage}]);
        setMessage("");
        setIsThinking(true);

        if (textareaRef.current) textareaRef.current.style.height = "auto";

        try {
            const token = Cookies.get("access_token");
            const response = await fetch(`${API_BASE_URL}/test/${chatId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                    Authorization: `Bearer ${token}`,
                },
                body: userMessage,
            });

            if (!response.body) throw new Error("No stream supported");

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let aiResponseText = "";

            setLogs((prev) => [...prev, {type: "ai", text: ""}]);

            while (true) {
                const {done, value} = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, {stream: true});

                const lines = chunk.split("\n");

                for (const line of lines) {

                    if (line.trim() === "" || !line.startsWith("data:")) continue;

                    const textChunk = line.replace("data:", "");

                    if (textChunk.includes("INTERVIEW_COMPLETED")) {
                        setIsCompleted(true);
                        const cleanChunk = textChunk.replace("INTERVIEW_COMPLETED", "");
                        aiResponseText += cleanChunk;
                    } else {
                        aiResponseText += textChunk;
                    }

                    setLogs((prev) => {
                        const newLogs = [...prev];
                        const lastIndex = newLogs.length - 1;
                        if (newLogs[lastIndex].type === "ai") {
                            newLogs[lastIndex] = {...newLogs[lastIndex], text: aiResponseText};
                        }
                        return newLogs;
                    });
                }
            }
        } catch (error) {
            console.error(error);
            setLogs((prev) => [
                ...prev,
                {type: "sys", text: "Ошибка соединения с сервером или потеря связи."},
            ]);
        } finally {
            setIsThinking(false);
        }
    }, [message, chatId, isThinking, isCompleted]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (historyLoading) {
        return (
            <div className="flex h-[700px] w-full items-center justify-center">
                <Loader2 className="animate-spin w-10 h-10 text-zinc-400"/>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="
            w-full
            h-[700px]
            flex flex-col
            overflow-hidden
            border border-zinc-100
            rounded-[2.5rem]
            bg-white
            shadow-sm
        ">
                {/* ===== Messages ===== */}
                <main className="
                flex-1
                overflow-y-auto
                p-8
                bg-zinc-50/40
                space-y-6
            ">
                    {logs.map((log, i) => (
                        <Message key={i} log={log}/>
                    ))}

                    {isThinking && (
                        <div className="flex items-center gap-3 text-sm text-zinc-500 animate-pulse">
                            <Loader2 className="w-4 h-4 animate-spin"/>
                            AI думает...
                        </div>
                    )}

                    <div ref={logEndRef}/>
                </main>

                {/* ===== Input ===== */}
                <footer className="
                p-6
                bg-white
                border-t border-zinc-100
            ">
                    {!isCompleted ? (
                        <div className="flex gap-4 items-end">
              <textarea
                  ref={textareaRef}
                  className="
                    flex-1
                    bg-zinc-50
                    border border-zinc-200
                    rounded-[1.5rem]
                    px-5 py-3
                    text-sm
                    resize-none
                    focus:outline-none
                    focus:border-black
                    focus:bg-white
                    transition-all
                    min-h-[48px]
                    max-h-[150px]
                    overflow-y-auto
                "
                  placeholder="Введите сообщение..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isThinking}
                  rows={1}
              />

                            <button
                                onClick={sendMessage}
                                disabled={isThinking || !message.trim()}
                                className="
                    h-12 w-12
                    flex-shrink-0
                    rounded-2xl
                    bg-black
                    text-white
                    flex items-center justify-center
                    transition-all
                    hover:bg-[#D6FF00]
                    hover:text-black
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                "
                            >
                                <Send size={18}/>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleGenerateResume}
                            className="
                  w-full
                  h-14
                  rounded-[2rem]
                  bg-[#D6FF00]
                  text-black
                  font-black
                  uppercase
                  tracking-widest
                  text-sm
                  transition-all
                  hover:brightness-105
                  hover:shadow-lg
              "
                        >
                            Сгенерировать резюме
                        </button>
                    )}
                </footer>
            </div>
        </div>
    );
}

const Message = React.memo(({log}: { log: Log }) => {
    const baseClasses = "px-5 py-4 rounded-[1.5rem] text-sm leading-relaxed break-words transition-all max-w-[85%] sm:max-w-[75%]";

    if (log.type === "user") {
        return (
            <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className={`${baseClasses} bg-black text-white rounded-br-sm`}>
                    {log.text}
                </div>
            </div>
        );
    }

    if (log.type === "sys") {
        return (
            <div className="flex justify-center py-2 animate-in fade-in duration-300">
                <div
                    className="flex items-center gap-2 text-xs text-red-500 bg-red-50 px-4 py-2 rounded-full border border-red-100">
                    <AlertCircle className="w-3 h-3"/>
                    {log.text}
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div
                className={`${baseClasses} bg-white border border-zinc-200 text-zinc-800 rounded-bl-sm shadow-sm prose prose-sm prose-p:my-1`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {log.text}
                </ReactMarkdown>
            </div>
        </div>
    );
});

Message.displayName = "Message";