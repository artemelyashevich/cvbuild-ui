"use client";

import { useConstructorStore } from "@/features";

export default function ResumePreview() {
    const { data } = useConstructorStore();

    const blocks = data?.blocks || {};

    if (!blocks || Object.keys(blocks).length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                Нет данных для отображения резюме
            </div>
        );
    }

    const renderContent = (content: any) => {
        if (typeof content === "string" || typeof content === "number") {
            return <p>{content}</p>;
        }

        if (Array.isArray(content)) {
            return content.map((item, i) => (
                <div key={i} className="mb-3">
                    {typeof item === "object" ? (
                        Object.entries(item).map(([key, value]) => (
                            <p key={key}>
                                <span className="font-semibold">
                                    {key}:
                                </span>{" "}
                                {String(value)}
                            </p>
                        ))
                    ) : (
                        <p>{item}</p>
                    )}
                </div>
            ));
        }

        if (typeof content === "object" && content !== null) {
            return Object.entries(content).map(([key, value]) => (
                <p key={key}>
                    <span className="font-semibold">{key}:</span>{" "}
                    {String(value)}
                </p>
            ));
        }

        return null;
    };

    return (
        <div className="h-[90vh] overflow-auto p-4">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto">

                {/* TITLE */}
                {data.title && (
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        {data.title}
                    </h1>
                )}

                {/* SECTIONS */}
                <div className="space-y-6">
                    {Object.entries(blocks).map(([sectionName, content]) => (
                        <div key={sectionName}>
                            <h2 className="text-xl font-semibold mb-2">
                                {sectionName}
                            </h2>

                            <div className="space-y-2">
                                {renderContent(content)}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}