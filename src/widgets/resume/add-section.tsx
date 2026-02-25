"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useResumeStore} from "@/features/store/resume-store";

export default function AddSection() {
    const [name, setName] = useState("");
    const addSection = useResumeStore((s) => s.addSection);

    const handleAdd = () => {
        if (!name.trim()) return;
        addSection(name.trim());
        setName("");
    };

    return (
        <div className="flex gap-3 mt-6">
            <Input
                placeholder="New section name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleAdd}>Add Section</Button>
        </div>
    );
}