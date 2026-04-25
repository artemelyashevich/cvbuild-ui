"use client";

import {useState} from "react";
import {Sparkles, Loader2, CheckCircle2} from "lucide-react";
import {cn} from "@/lib/utils";
import {axiosWithToken} from "@/features";
import {useParams} from "next/navigation";

export default function VacancyAdapter() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const {resumeId} = useParams();

    const handleSubmit = async () => {
        if (!url) return;

        try {
            setLoading(true);

            await axiosWithToken.post("/resumes/ats/" + resumeId,
                {
                    url
                });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white p-6 md:p-8 shadow-xl group">

            {/* Glow */}
            <div
                className="absolute -top-10 -right-10 w-[200px] h-[200px] bg-[#D6FF00]/30 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"/>

            <div className="relative z-10 space-y-6">

                {/* Header */}
                <div className="space-y-3">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                        <Sparkles className="w-3 h-3"/>
                        AI адаптация
                    </div>

                    <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                        Подстроим резюме
                        <span className="relative inline-block ml-2">
                            <span className="absolute inset-0 bg-[#D6FF00] -rotate-1 skew-x-3 rounded-md -z-10"/>
                            <span className="relative px-2 text-black">под вакансию</span>
                        </span>
                    </h3>

                    <p className="text-sm text-zinc-500 max-w-sm">
                        Вставьте ссылку — AI перепишет опыт и навыки под требования работодателя
                    </p>
                </div>

                {/* Input */}
                <div className="flex flex-col sm:flex-row gap-3">

                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://linkedin.com/jobs/... или hh.ru/..."
                        className="flex-1 h-14 px-5 rounded-2xl border border-zinc-200 bg-zinc-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white transition-all"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={cn(
                            "relative h-14 px-6 rounded-2xl font-bold uppercase text-sm tracking-wide flex items-center justify-center gap-2 overflow-hidden transition-all",
                            loading
                                ? "bg-zinc-900 text-white"
                                : "bg-black text-white hover:scale-[1.03] active:scale-95"
                        )}
                    >
                        {!loading && (
                            <div
                                className="absolute inset-0 bg-[#D6FF00] translate-y-full group-hover:translate-y-0 transition-transform duration-300"/>
                        )}

                        <span className="relative flex items-center gap-2 z-10">
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin"/>
                                    Обработка
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4"/>
                                    Адаптировать
                                </>
                            )}
                        </span>
                    </button>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#D6FF00]"/>
                    AI анализирует требования и усиливает релевантный опыт
                </div>
            </div>
        </div>
    );
}