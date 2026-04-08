"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { useConstructorStore } from "@/features";
import { useTemplateStore } from "@/features/store/template-store";

const demoData = {
    "personal-details": {
        name: "Иван Иванов",
        role: "Frontend Developer",
        email: "ivan@mail.com"
    },
    experience: [{ role: "Frontend Developer", company: "Google" }],
    education: [{ school: "MIT", degree: "Computer Science" }]
};

function renderPreviewSection(type: string) {
    switch (type) {
        case "personal-details":
            return (
                <>
                    <div className="h-2 w-1/2 bg-zinc-300 rounded" />
                    <div className="h-1.5 w-1/3 bg-zinc-200 rounded" />
                </>
            );
        case "experience":
            return (
                <>
                    <div className="h-1.5 w-full bg-zinc-200 rounded" />
                    <div className="h-1.5 w-4/5 bg-zinc-200 rounded" />
                </>
            );
        case "education":
            return <div className="h-1.5 w-3/4 bg-zinc-200 rounded" />;
        default:
            return <div className="h-1.5 w-full bg-zinc-100 rounded" />;
    }
}

export default function TemplateSelector() {
    const { templates, fetchTemplates, selectTemplate, currentTemplate } = useTemplateStore();
    const { setData, setTemplate } = useConstructorStore();

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleSelect = async (id: string) => {
        const selected = await selectTemplate(id);
        if (!selected) return;

        setTemplate(selected.name);

        setData({
            blocks:
                Object.keys(selected.defaultBlocks || {}).length
                    ? selected.defaultBlocks
                    : demoData
        });
    };

    return (
        <div className="space-y-3 w-full max-w-xl">

            <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                    Шаблон
                </h2>
                <span className="text-xs text-zinc-400">
                    {templates.length} вариантов
                </span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {templates.map((t) => {
                    const isActive = currentTemplate?.id === t.id;

                    return (
                        <motion.div
                            key={t.id}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSelect(t.id)}
                            className={cn(
                                "relative min-w-[160px] rounded-2xl border cursor-pointer overflow-hidden transition-all",
                                isActive
                                    ? "border-black shadow-lg"
                                    : "border-zinc-200 hover:border-black hover:shadow-md"
                            )}
                        >
                            <div className="h-32 bg-gradient-to-br from-zinc-100 to-zinc-200 p-2">
                                <div
                                    className={cn(
                                        "w-full h-full bg-white rounded-lg p-2 gap-2",
                                        t.layout.columns === 2
                                            ? "grid grid-cols-2"
                                            : "flex flex-col"
                                    )}
                                >
                                    {t.layout.sectionOrder.map((section) => (
                                        <div key={section} className="space-y-1">
                                            <div className="h-1.5 w-1/3 bg-zinc-300 rounded" />
                                            {renderPreviewSection(section)}
                                        </div>
                                    ))}
                                </div>

                                {isActive && (
                                    <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1">
                                        <Check className="w-3 h-3" />
                                    </div>
                                )}
                            </div>

                            <div className="px-3 py-2">
                                <p className="text-xs font-semibold truncate">
                                    {t.name}
                                </p>
                                <p className="text-[10px] text-zinc-400">
                                    {t.layout.columns === 2 ? "2 колонки" : "1 колонка"}
                                </p>
                            </div>

                            <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition" />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}