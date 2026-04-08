"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { useConstructorStore } from "@/features/store/constructor-store";
import ResumePDF from "@/widgets/resume/pdf-doc";
import { Download, Loader2 } from "lucide-react";

export default function ExportPDF() {
    const { data, sectionOrder } = useConstructorStore();

    return (
        <PDFDownloadLink
            document={
                <ResumePDF
                    data={data}
                    sectionOrder={sectionOrder}
                />
            }
            fileName="resume.pdf"
        >
            {({ loading }) => (
                <Button
                    className={`
                        group relative h-12 px-6 rounded-2xl font-bold
                        flex items-center gap-2 overflow-hidden
                        transition-all duration-300
                        ${loading
                        ? "bg-zinc-200 text-zinc-500"
                        : "bg-black text-white hover:bg-zinc-800"}
                    `}
                    disabled={loading}
                >
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                    <span className="relative flex items-center gap-2">
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Генерация PDF...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                Скачать PDF
                            </>
                        )}
                    </span>
                </Button>
            )}
        </PDFDownloadLink>
    );
}