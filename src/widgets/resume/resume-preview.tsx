"use client";


import {useResumeStore} from "@/features";

export default function ResumePreview() {
    const { data, sectionOrder, template } = useResumeStore();
    const blocks = data.blocks || {};

    return (
        <div className="h-[90vh] overflow-auto sticky top-20">
            <div
                className={`bg-white shadow-2xl rounded-2xl p-10`}
                style={{ minHeight: "80vh" }}
            >
                {sectionOrder.map((section) => {
                    const content = blocks[section];

                    return (
                        <div key={section} className="mb-8">
                            <h2
                                className={`text-2xl font-bold mb-4 capitalize ${
                                    template === "modern"
                                        ? "border-b pb-2"
                                        : template === "classic"
                                            ? "uppercase tracking-wide"
                                            : ""
                                }`}
                            >
                                {section}
                            </h2>

                            <div className="space-y-2">
                                {Object.entries(content || {}).map(([key, value]) => (
                                    <div key={key}>
                                        {typeof value === "string" || typeof value === "number" ? (
                                            <p>
                                                <span className="font-semibold capitalize">{key}:</span>{" "}
                                                {value}
                                            </p>
                                        ) : Array.isArray(value) ? (
                                            <ul className="list-disc ml-6">
                                                {value.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}