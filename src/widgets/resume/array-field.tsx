"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import FieldRenderer from "@/widgets/resume/field-renderer";
import {useResumeStore} from "@/features/store/resume-store";

export default function ArrayField({ value, path, label }: any) {
    const { addArrayItem, removeArrayItem } = useResumeStore();

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <span className="font-medium">{label}</span>
                <Button size="sm" onClick={() => addArrayItem(path)}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
            </div>

            {value.map((item: any, index: number) => (
                <Card key={index} className="p-4 rounded-xl">
                    <div className="flex justify-end">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeArrayItem(path, index)}
                        >
                            <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                    </div>
                    <FieldRenderer value={item} path={[...path, String(index)]} />
                </Card>
            ))}
        </div>
    );
}