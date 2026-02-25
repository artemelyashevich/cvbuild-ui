"use client";

import { Button } from "@/components/ui/button";
import {useResumeStore} from "@/features/store/resume-store";

export default function TemplateSelector() {
    const { template, setTemplate } = useResumeStore();

    return (
        <div className="flex gap-3">
            <Button
                variant={template === "modern" ? "default" : "outline"}
                onClick={() => setTemplate("modern")}
            >
                Modern
            </Button>

            <Button
                variant={template === "classic" ? "default" : "outline"}
                onClick={() => setTemplate("classic")}
            >
                Classic
            </Button>

            <Button
                variant={template === "minimal" ? "default" : "outline"}
                onClick={() => setTemplate("minimal")}
            >
                Minimal
            </Button>
        </div>
    );
}