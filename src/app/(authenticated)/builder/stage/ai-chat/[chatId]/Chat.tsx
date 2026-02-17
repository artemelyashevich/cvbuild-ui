"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";

type Log = {
    type: "user" | "ai" | "sys";
    text: string;
};

export default function Chat() {
    const { chatId } = useParams();
    const [message, setMessage] = useState("");
    const [logs, setLogs] = useState<Log[]>([
        {type: "ai", text: "Привет! Я помогу тебе создать резюме! Начнем?"},
    ]);
    const [isThinking, setIsThinking] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const logEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs, isThinking]);

    const sendMessage = useCallback(async () => {
        if (!message.trim() || isThinking || isCompleted) return;

        const userMessage = message;
        setLogs((prev) => [...prev, { type: "user", text: userMessage }]);
        setMessage("");
        setIsThinking(true);
        setHasStarted(false);

        try {
            const response = await fetch(`http://localhost:8888/test/${chatId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
                body: userMessage,
            });

            if (!response.body) throw new Error("No stream");

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";
            let aiMessage = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (!line.startsWith("data:")) continue;
                    const chunk = line.replace(/data:/, "");
                    if (!chunk) continue;

                    if (!hasStarted) setHasStarted(true);
                    if (isThinking) setIsThinking(false);

                    aiMessage += chunk;

                    if (aiMessage.includes("INTERVIEW_COMPLETED")) {
                        setIsCompleted(true);
                        aiMessage = aiMessage.replace("INTERVIEW_COMPLETED", "");
                    }

                    setLogs((prev) => {
                        const last = prev[prev.length - 1];
                        if (last?.type === "ai") {
                            const updated = [...prev];
                            updated[updated.length - 1] = { type: "ai", text: aiMessage };
                            return updated;
                        }
                        return [...prev, { type: "ai", text: aiMessage }];
                    });
                }
            }
        } catch {
            setLogs((prev) => [
                ...prev,
                { type: "sys", text: "Ошибка соединения с сервером." },
            ]);
        } finally {
            setIsThinking(false);
        }
    }, [message, chatId, isThinking, isCompleted, hasStarted]);

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
                        <Message key={i} log={log} />
                    ))}

                    {isThinking && !hasStarted && (
                        <div className="flex items-center gap-3 text-sm text-zinc-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            AI печатает...
                        </div>
                    )}

                    <div ref={logEndRef} />
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
                                max-h-[120px]
                            "
                            placeholder="Введите сообщение..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            disabled={isThinking}
                        />

                            <button
                                onClick={sendMessage}
                                disabled={isThinking}
                                className="
                                h-12 w-12
                                rounded-2xl
                                bg-black
                                text-white
                                flex items-center justify-center
                                transition-all
                                hover:bg-[#D6FF00]
                                hover:text-black
                                disabled:opacity-40
                            "
                            >
                                <Send size={18} />
                            </button>

                        </div>
                    ) : (
                        <button
                            onClick={() => (window.location.href = "/form/stage/form")}
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

function Message({ log }: { log: Log }) {
    const base =
        "px-5 py-4 rounded-[1.5rem] text-sm leading-relaxed break-words transition-all";

    if (log.type === "user") {
        return (
            <div className="flex justify-end">
                <div className="max-w-[75%]">
                    <div className={`${base} bg-black text-white rounded-br-sm`}>
                        {log.text}
                    </div>
                </div>
            </div>
        );
    }

    if (log.type === "sys") {
        return (
            <div className="flex justify-start">
                <div className="max-w-[75%]">
                    <div className={`${base} bg-zinc-100 text-zinc-600 flex items-center gap-2`}>
                        <AlertCircle className="w-4 h-4" />
                        {log.text}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-start">
            <div className="max-w-[75%]">
                <div className={`${base} bg-white border border-zinc-200 text-zinc-800 rounded-bl-sm shadow-sm`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {log.text}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
