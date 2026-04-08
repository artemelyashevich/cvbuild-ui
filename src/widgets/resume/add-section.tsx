"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConstructorStore } from "@/features/store/constructor-store";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_SECTIONS = [
    "Навыки",
    "О себе",
    "Проекты",
    "Языки",
];

export default function AddSection() {
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const addSection = useConstructorStore((s) => s.addSection);

    const handleAdd = () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        addSection(trimmed);
        setName("");
        setIsOpen(false);
    };

    const handleQuickAdd = (value: string) => {
        addSection(value);
    };

    return (
        <div className="pt-4">

            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-dashed border-zinc-300 text-zinc-500 font-semibold hover:border-black hover:text-black hover:bg-white transition"
                >
                    <Plus className="w-4 h-4" />
                    Добавить секцию
                </button>
            ) : (
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 space-y-4 shadow-sm">

                    {/* Input */}
                    <div className="flex gap-3">
                        <Input
                            autoFocus
                            placeholder="Название секции"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleAdd();
                                if (e.key === "Escape") setIsOpen(false);
                            }}
                            className="h-11 rounded-xl"
                        />

                        <Button
                            onClick={handleAdd}
                            disabled={!name.trim()}
                            className="rounded-xl"
                        >
                            Добавить
                        </Button>
                    </div>

                    {/* Quick presets */}
                    <div className="flex flex-wrap gap-2">
                        {QUICK_SECTIONS.map((s) => (
                            <button
                                key={s}
                                onClick={() => handleQuickAdd(s)}
                                className={cn(
                                    "px-3 py-1.5 text-xs rounded-full border transition",
                                    "border-zinc-200 text-zinc-500",
                                    "hover:border-black hover:text-black hover:bg-zinc-50"
                                )}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Cancel */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-xs text-zinc-400 hover:text-black transition"
                    >
                        Отмена
                    </button>
                </div>
            )}
        </div>
    );
}