"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {FieldType, useResumeStore} from "@/features/store/resume-store";

export default function AddField({ path }: { path: string[] }) {
    const addField = useResumeStore((s) => s.addField);

    const [key, setKey] = useState("");
    const [type, setType] = useState<FieldType>("string");

    const handleAdd = () => {
        if (!key.trim()) return;
        addField(path, key.trim(), type);
        setKey("");
    };

    return (
        <div className="flex gap-3 mt-4">
            <Input
                placeholder="Field name"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />

            <Select onValueChange={(val: FieldType) => setType(val)}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="string">String</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="boolean">Boolean</SelectItem>
                    <SelectItem value="array">Array</SelectItem>
                    <SelectItem value="object">Object</SelectItem>
                </SelectContent>
            </Select>

            <Button onClick={handleAdd}>Add</Button>
        </div>
    );
}