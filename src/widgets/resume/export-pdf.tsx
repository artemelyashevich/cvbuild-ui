"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/features/store/resume-store";
import ResumePDF from "@/widgets/resume/pdf-doc";

export default function ExportPDF() {
    const { data, sectionOrder } = useResumeStore();

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
                <Button className="mt-4">
                    {loading ? "Generating PDF..." : "Download PDF"}
                </Button>
            )}
        </PDFDownloadLink>
    );
}