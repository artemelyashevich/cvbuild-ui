"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useConstructorStore } from "@/features";
import { useTemplateStore } from "@/features/store/template-store";

// 👉 демо-данные для превью (ключевая часть!)
const demoData = {
    "personal-details": {
        name: "Иван Иванов",
        role: "Frontend Developer",
        email: "ivan@mail.com"
    },
    experience: [
        {
            role: "Frontend Developer",
            company: "Google"
        }
    ],
    education: [
        {
            school: "MIT",
            degree: "Computer Science"
        }
    ]
};

function renderPreviewSection(type: string) {
    switch (type) {
        case "personal-details":
            return (
                <div className="space-y-1">
                    <div className="h-3 w-1/2 bg-zinc-300 rounded" />
                    <div className="h-2 w-1/3 bg-zinc-200 rounded" />
                </div>
            );

        case "experience":
            return (
                <div className="space-y-1">
                    <div className="h-2 w-full bg-zinc-200 rounded" />
                    <div className="h-2 w-4/5 bg-zinc-200 rounded" />
                </div>
            );

        case "education":
            return (
                <div className="space-y-1">
                    <div className="h-2 w-3/4 bg-zinc-200 rounded" />
                </div>
            );

        default:
            return <div className="h-2 w-full bg-zinc-100 rounded" />;
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

        // 👉 если нет данных — используем демо
        setData({
            blocks: Object.keys(selected.defaultBlocks || {}).length
                ? selected.defaultBlocks
                : demoData
        });
    };

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight">Выберите шаблон</h2>
                <span className="text-sm text-zinc-500">{templates.length} вариантов</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((t) => {
                    const isActive = currentTemplate?.id === t.id;

                    return (
                        <motion.div
                            key={t.id}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => handleSelect(t.id)}
                            className={`group cursor-pointer relative rounded-3xl border transition-all overflow-hidden
                ${isActive
                                ? "border-black shadow-xl"
                                : "border-zinc-200 hover:border-black hover:shadow-lg"}`}
                        >
                            {/* 🔥 РЕАЛЬНЫЙ ПРЕВЬЮ НА ОСНОВЕ layout */}
                            <div className="h-56 bg-gradient-to-br from-zinc-100 to-zinc-200 p-3">
                                <div className={`w-full h-full bg-white rounded-xl shadow-inner p-3 flex flex-col gap-3 overflow-hidden ${
                                    t.layout.columns === 2 ? "grid grid-cols-2 gap-3" : "flex flex-col"
                                }`}>
                                    {t.layout.sectionOrder.map((section) => (
                                        <div key={section} className="space-y-1">
                                            <div className="h-2 w-1/3 bg-zinc-300 rounded" />
                                            {renderPreviewSection(section)}
                                        </div>
                                    ))}
                                </div>

                                {isActive && (
                                    <div className="absolute top-3 right-3 bg-black text-white rounded-full p-1">
                                        <Check className="w-4 h-4" />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-2">
                                <h3 className="font-bold text-lg tracking-tight">
                                    {t.name}
                                </h3>

                                <p className="text-xs text-zinc-500">
                                    {t.layout.columns === 2 ? "Двухколоночный" : "Одноколоночный"} • {t.layout.sectionOrder.length} секций
                                </p>
                            </div>

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
