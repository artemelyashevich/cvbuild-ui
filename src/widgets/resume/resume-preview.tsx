"use client";

import { useConstructorStore } from "@/features";
import { useTemplateStore } from "@/features/store/template-store";
import { cn } from "@/lib/utils";

export default function ResumePreview() {
    const { data } = useConstructorStore();
    const { currentTemplate } = useTemplateStore();

    const blocks = data.blocks || {};
    const sectionOrder = currentTemplate?.layout?.sectionOrder || [];
    const columns = currentTemplate?.layout?.columns || 1;

    if (!currentTemplate) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                Выберите шаблон для предварительного просмотра.
            </div>
        );
    }

    const headerStyle = currentTemplate.styles.header;
    const sectionTitleStyle = currentTemplate.styles.sectionTitle;
    const textStyle = currentTemplate.styles.text;

    const gridClasses = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    };

    return (
        <div className="h-[90vh] overflow-auto sticky top-20 p-4">
            <div
                className={cn(
                    "bg-white shadow-2xl rounded-2xl p-8 md:p-10 lg:p-12",// Для плавных переходов при изменении стилей
                    )}
                style={{ minHeight: "80vh" }}
            >
                {data.title && (
                    <h1 className={cn("mb-8 text-center", headerStyle)}>
                        {data.title}
                    </h1>
                )}

                <div className={cn("grid gap-8", gridClasses[columns as keyof typeof gridClasses])}>
                    {sectionOrder.map((sectionKey) => {
                        const sectionContent = blocks[sectionKey];

                        if (!sectionContent || Object.keys(sectionContent).length === 0) {
                            return null;
                        }

                        return (
                            <div key={sectionKey} className="break-inside-avoid-column">
                                <h2 className={cn("mb-4 capitalize", sectionTitleStyle)}>
                                    {sectionKey.replace(/-/g, ' ')}
                                </h2>

                                <div className={cn("space-y-3", textStyle)}>
                                    {Object.entries(sectionContent).map(([key, value]) => (
                                        <div key={key}>
                                            {typeof value === "string" || typeof value === "number" ? (
                                                <p>
                                                    <span className="font-semibold capitalize">{key.replace(/-/g, ' ')}:</span>{" "}
                                                    {value}
                                                </p>
                                            ) : Array.isArray(value) ? (
                                                <div>
                                                    {value.length > 0 && <p className="font-semibold capitalize">{key.replace(/-/g, ' ')}:</p>}
                                                    <ul className="list-disc ml-6 mt-1 space-y-1">
                                                        {value.map((item, i) => (
                                                            <li key={i}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : typeof value === "object" && value !== null ? (
                                                <div className="mb-2">
                                                    <p className="font-semibold capitalize">{key.replace(/-/g, ' ')}</p>
                                                    <div className="ml-4 space-y-1">
                                                        {Object.entries(value).map(([subKey, subValue]) => (
                                                            <p key={subKey}>
                                                                <span className="font-medium capitalize">{subKey.replace(/-/g, ' ')}:</span>{" "}
                                                                {typeof subValue === 'string' || typeof subValue === 'number' ? subValue : JSON.stringify(subValue)}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}