"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GripVertical, Trash } from "lucide-react";
import FieldRenderer from "@/widgets/resume/field-renderer";
import { useSortable } from "@dnd-kit/sortable";
import { useConstructorStore } from "@/features/store/constructor-store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SortableSection({ id, value }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const renameSection = useConstructorStore((s) => s.renameSection);
    const removeSection = useConstructorStore((s) => s.removeSection);

    const [title, setTitle] = useState(id);

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition,
    };

    const handleBlur = () => {
        const trimmed = title.trim();
        if (trimmed && trimmed !== id) {
            renameSection(id, trimmed);
        } else {
            setTitle(id);
        }
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={cn(
                "group relative p-6 rounded-[2rem] border bg-white transition-all duration-300",
                "border-zinc-100 hover:border-black hover:shadow-xl",
                isDragging && "opacity-50 scale-[0.98]"
            )}
        >

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">

                {/* Drag handle */}
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing p-2 rounded-xl hover:bg-zinc-100 transition"
                >
                    <GripVertical className="w-5 h-5 text-zinc-400 group-hover:text-black" />
                </div>

                {/* Title */}
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    placeholder="Название секции"
                    className="text-lg font-semibold border-none shadow-none focus-visible:ring-0 px-0 flex-1 bg-transparent"
                />

                {/* Delete */}
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeSection(id)}
                    className="opacity-0 group-hover:opacity-100 transition"
                >
                    <Trash className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            {/* Content */}
            <div className="space-y-4">
                <FieldRenderer value={value} path={["blocks", id]} />
            </div>
        </Card>
    );
}