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
    const [logs, setLogs] = useState<Log[]>([]);
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
        <div className="px-4 font-sans flex justify-center">
            <div className="w-full max-w-2xl h-[700px] flex flex-col overflow-hidden border rounded-2xl bg-white shadow-xl">

                {/* MESSAGES */}
                <main className="flex-1 overflow-y-auto p-5 bg-slate-50 space-y-4">
                    {logs.map((log, i) => (
                        <Message key={i} log={log} />
                    ))}

                    {isThinking && !hasStarted && (
                        <div className="flex justify-start items-center gap-2">
                            <Loader2 className="animate-spin text-indigo-500" />
                            <span className="text-sm text-indigo-500">AI печатает...</span>
                        </div>
                    )}

                    <div ref={logEndRef} />
                </main>

                {/* INPUT */}
                <footer className="p-4 bg-white border-t">
                    {!isCompleted ? (
                        <div className="flex gap-2">
              <textarea
                  className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-10 md:h-12"
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
                                className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => (window.location.href = "/form/stage/form")}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all"
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
    const baseClasses =
        "px-4 py-3 rounded-2xl text-sm break-words whitespace-pre-wrap overflow-hidden transition-all";

    let styleClasses = "";
    if (log.type === "user") {
        styleClasses = "bg-indigo-600 text-white rounded-br-none";
    } else if (log.type === "sys") {
        styleClasses = "bg-red-100 text-red-600 flex items-center gap-1";
    } else {
        styleClasses =
            "bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm";
    }

    return (
        <div className={`flex ${log.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[85%] overflow-hidden">
                <div className={`${baseClasses} ${styleClasses}`}>
                    {log.type === "ai" ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{log.text}</ReactMarkdown>
                    ) : log.type === "sys" ? (
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{log.text}</span>
                        </div>
                    ) : (
                        log.text
                    )}
                </div>
            </div>
        </div>
    );
}
