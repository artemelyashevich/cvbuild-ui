"use client";

import React, {useState, useEffect, useRef} from 'react';
import {useStomp} from "@/features/context/StompContext";
import {Send, Bot, User, Loader2, Circle, Sparkles, ArrowRight} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Cookies from "js-cookie";
import {useParams} from "next/navigation";

export default function Chat() {
    const {chatId} = useParams()

    const {stompClient, isConnected} = useStomp();
    const [message, setMessage] = useState('');
    const [logs, setLogs] = useState<{ type: 'user' | 'ai' | 'sys'; text: string; timeTaken?: string }[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [thinkingTime, setThinkingTime] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const logEndRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [logs, isThinking]);

    useEffect(() => {
        if (isThinking) {
            setThinkingTime(0);
            timerRef.current = setInterval(() => {
                setThinkingTime((prev) => prev + 0.1);
            }, 100);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isThinking]);

    useEffect(() => {
        if (!isConnected || !stompClient || !chatId) return;

        const topic = `/topic/chat/${chatId}`;
        const subscription = stompClient.subscribe(topic, (msg) => {
            const token = msg.body;

            if (isThinking) {
                setIsThinking(false);
            }

            if (token === '[DONE]') return;

            if (token.startsWith("Error:")) {
                setLogs(prev => [...prev, {type: 'sys', text: token}]);
            } else {
                setLogs((prev) => {
                    const lastLog = prev[prev.length - 1];

                    if (lastLog && lastLog.type === 'ai') {
                        const updatedText = lastLog.text + token;

                        if (updatedText.includes("INTERVIEW_COMPLETED")) {
                            setIsCompleted(true);
                            const cleanText = updatedText.replace("INTERVIEW_COMPLETED", "");
                            const newLogs = [...prev];
                            newLogs[newLogs.length - 1] = {...lastLog, text: cleanText};
                            return newLogs;
                        }

                        const newLogs = [...prev];
                        newLogs[newLogs.length - 1] = {...lastLog, text: updatedText};
                        return newLogs;
                    }

                    if (token.includes("INTERVIEW_COMPLETED")) {
                        setIsCompleted(true);
                        return [...prev, {type: 'ai', text: token.replace("INTERVIEW_COMPLETED", "")}];
                    }
                    return [...prev, {type: 'ai', text: token}];
                });
            }
        });
        return () => subscription.unsubscribe();
    }, [isConnected, stompClient, chatId, isThinking]);

    const sendMessage = () => {
        if (stompClient && isConnected && message.trim() && !isCompleted) {
            stompClient.publish({
                destination: '/app/ai.interview',
                body: JSON.stringify({chatId, content: message, userId: localStorage.getItem("id")}),
                headers: {'Authorization': `Bearer ${Cookies.get("access_token")}`},
            });

            setLogs(prev => [...prev, {type: 'user', text: message}]);
            setMessage('');
            setIsThinking(true);
        }
    };

    return (
        <div className="px-4 font-sans">
            <div className="w-full max-w-2xl h-[700px] flex flex-col overflow-hidden">

                {/* HEADER */}
                <header
                    className="bg-white border-b border-slate-100 px-5 py-3.5 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-600 p-2 rounded-xl text-white shadow-lg">
                            <Bot size={20}/>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-slate-800 tracking-tight">AI Interviewer</h1>
                            <div className="flex items-center gap-1.5">
                                <Circle size={8}
                                        className={`${isConnected ? 'fill-green-500 text-green-500 animate-pulse' : 'fill-red-500 text-red-500'}`}/>
                                <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
                                    {isConnected ? 'Connected' : 'Disconnected'}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* MESSAGES AREA */}
                <main className="flex-1 overflow-y-auto p-5 bg-slate-50/50 space-y-4">
                    {logs.map((log, i) => (
                        <div key={i}
                             className={`flex ${log.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                            <div
                                className={`flex gap-2.5 max-w-[90%] ${log.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${
                                        log.type === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'
                                    }`}>
                                    {log.type === 'user' ? <User size={14}/> : <Bot size={14}/>}
                                </div>
                                <div className={`px-4 py-3 rounded-2xl text-sm ${
                                    log.type === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                                }`}>
                                    {log.type === 'ai' ? (
                                        <div className="prose prose-sm max-w-none prose-p:leading-relaxed">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{log.text}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        <span className="whitespace-pre-wrap">{log.text}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* THINKING INDICATOR */}
                    {isThinking && (
                        <div className="flex justify-start animate-pulse">
                            <div
                                className="flex gap-2.5 items-center bg-white border border-slate-200 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"/>
                                    <div
                                        className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"/>
                                    <div
                                        className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"/>
                                </div>
                                <span
                                    className="text-[11px] font-mono text-slate-400 ml-2">{thinkingTime.toFixed(1)}s</span>
                            </div>
                        </div>
                    )}

                    {/* COMPLETION MESSAGE */}
                    {isCompleted && (
                        <div
                            className="p-4 bg-green-50 border border-green-100 rounded-2xl text-center space-y-2 animate-in zoom-in-95">
                            <div
                                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-200">
                                <Sparkles className="text-white w-6 h-6"/>
                            </div>
                            <h3 className="font-bold text-green-800">Данные успешно подтверждены!</h3>
                            <p className="text-xs text-green-600">Нажмите кнопку ниже, чтобы перейти к финальному
                                этапу.</p>
                        </div>
                    )}

                    <div ref={logEndRef}/>
                </main>

                {/* FOOTER */}
                <footer className="p-4 bg-white border-t border-slate-100">
                    {!isCompleted ? (
                        <div
                            className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all">
                            <input
                                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm text-slate-900"
                                placeholder={isThinking ? "ИИ формулирует мысль..." : "Напишите ваш ответ..."}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                disabled={!isConnected || isThinking}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!isConnected || !message.trim() || isThinking}
                                className={`p-2 rounded-xl transition-all ${
                                    message.trim() && isConnected && !isThinking
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'bg-slate-200 text-slate-400'
                                }`}
                            >
                                {isThinking ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => window.location.href = '/form/stage/form'}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-indigo-200 animate-in slide-in-from-bottom-4"
                        >
                            <Sparkles size={20}/>
                            Сгенерировать резюме
                            <ArrowRight size={20}/>
                        </button>
                    )}
                </footer>
            </div>
        </div>
    );
}