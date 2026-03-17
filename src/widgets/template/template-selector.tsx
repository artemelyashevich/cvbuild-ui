"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useConstructorStore } from "@/features";
import {useTemplateStore} from "@/features/store/template-store";

export default function TemplateSelector() {
    const { templates, fetchTemplates, selectTemplate } = useTemplateStore();
    const { setData, setTemplate } = useConstructorStore();

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleSelect = async (id: string) => {
        const template = await selectTemplate(id);

        const selected = useTemplateStore.getState().currentTemplate;

        if (!selected) return;

        setTemplate(selected.name);
        setData({ blocks: selected.defaultBlocks });
    };

    return (
        <div className="flex gap-3 flex-wrap">
            {templates.map((t) => (
                <Button key={t.id} onClick={() => handleSelect(t.id)}>
                    {t.name}
                </Button>
            ))}
        </div>
    );
}