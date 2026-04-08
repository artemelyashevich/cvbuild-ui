"use client";

import { useConstructorStore } from "@/features";

export default function ResumePreview() {
    const { data, sectionOrder } = useConstructorStore();

    const blocks = data?.blocks || {};

    if (!blocks || Object.keys(blocks).length === 0) {
        return (
            <div className="flex items-center justify-center h-[500px] text-zinc-400 text-sm">
                Здесь появится ваше резюме
            </div>
        );
    }

    const formatLabel = (key: string) => {
        return key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const renderContent = (content: any) => {
        if (typeof content === "string" || typeof content === "number") {
            return <p className="text-sm text-zinc-700">{content}</p>;
        }

        if (Array.isArray(content)) {
            return content.map((item, i) => (
                <div key={i} className="space-y-1">
                    {typeof item === "object" ? (
                        Object.entries(item).map(([key, value]) => (
                            <div key={key} className="flex gap-2 text-sm">
                                <span className="text-zinc-400 min-w-[90px]">
                                    {formatLabel(key)}
                                </span>
                                <span className="text-zinc-800 font-medium">
                                    {String(value)}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-zinc-700">{item}</p>
                    )}
                </div>
            ));
        }

        if (typeof content === "object" && content !== null) {
            return Object.entries(content).map(([key, value]) => (
                <div key={key} className="flex gap-2 text-sm">
                    <span className="text-zinc-400 min-w-[90px]">
                        {formatLabel(key)}
                    </span>
                    <span className="text-zinc-800 font-medium">
                        {String(value)}
                    </span>
                </div>
            ));
        }

        return null;
    };

    return (
        <div className="h-[90vh] overflow-auto px-4 py-6 bg-zinc-100 rounded-[2rem]">

            {/* Paper */}
            <div className="bg-white shadow-2xl rounded-[1.5rem] p-10 max-w-[800px] mx-auto space-y-8">

                {/* Header */}
                {data.title && (
                    <div className="text-center border-b pb-6">
                        <h1 className="text-3xl font-black tracking-tight">
                            {data.title}
                        </h1>
                    </div>
                )}

                {/* Sections */}
                <div className="space-y-8">
                    {(sectionOrder || Object.keys(blocks)).map((sectionName) => {
                        const content = blocks[sectionName];
                        if (!content) return null;

                        return (
                            <div key={sectionName} className="space-y-3">

                                {/* Section title */}
                                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 border-b pb-1">
                                    {formatLabel(sectionName)}
                                </h2>

                                {/* Content */}
                                <div className="space-y-3">
                                    {renderContent(content)}
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}