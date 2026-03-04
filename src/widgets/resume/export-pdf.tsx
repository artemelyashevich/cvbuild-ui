"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { useConstructorStore } from "@/features/store/constructor-store";
import ResumePDF from "@/widgets/resume/pdf-doc";

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
                <Button className="mt-4">
                    {loading ? "Generating PDF..." : "Download PDF"}
                </Button>
            )}
        </PDFDownloadLink>
    );
}