"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { useConstructorStore } from "@/features/store/constructor-store";
import ResumePDF from "@/widgets/resume/pdf-doc";
import { Download, Loader2 } from "lucide-react";

export default function ExportPDF() {
    const { data, sectionOrder } = useConstructorStore();

    if (!data || !data.blocks) {
        return (
            <Button disabled className="h-12 px-6 rounded-2xl">
                Нет данных
            </Button>
        );
    }

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
                    disabled={loading}
                    className={`
                        h-12 px-6 rounded-2xl font-bold flex items-center gap-2
                        transition-all duration-300
                        ${loading
                        ? "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                        : "bg-black text-white hover:bg-zinc-800 active:scale-[0.98]"
                    }
                    `}
                >
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
                </Button>
            )}
        </PDFDownloadLink>
    );
}