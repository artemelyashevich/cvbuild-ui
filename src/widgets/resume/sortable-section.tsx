"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {GripVertical, Trash} from "lucide-react";
import FieldRenderer from "@/widgets/resume/field-renderer";
import { useSortable } from "@dnd-kit/sortable";
import { useResumeStore } from "@/features/store/resume-store";
import { useState } from "react";
import {Button} from "@/components/ui/button";

export default function SortableSection({ id, value }: any) {
    const { attributes, listeners, setNodeRef } = useSortable({ id });
    const renameSection = useResumeStore((s) => s.renameSection);
    const removeSection = useResumeStore((s) => s.removeSection);
    const [title, setTitle] = useState(id);

    const handleBlur = () => {
        if (title !== id) {
            renameSection(id, title.trim());
        }
    };

    return (
        <Card ref={setNodeRef} className="p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-6">
                <div {...attributes} {...listeners} className="cursor-grab">
                    <GripVertical className="w-5 h-5 text-muted-foreground" />
                </div>

                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    className="text-xl font-semibold border-none shadow-none focus-visible:ring-0 px-0 flex-1"
                />

                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeSection(id)}
                >
                    <Trash className="w-4 h-4 text-red-500" />
                </Button>
            </div>

            <FieldRenderer value={value} path={["blocks", id]} />
        </Card>
    );
}