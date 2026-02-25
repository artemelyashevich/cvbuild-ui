"use client";

import { useEffect } from "react";

import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import SortableSection from "@/widgets/resume/sortable-section";
import {useResumeStore} from "@/features/store/resume-store";
import TemplateSelector from "@/widgets/resume/template-selector";
import ResumePreview from "@/widgets/resume/resume-preview";
import AddSection from "@/widgets/resume/add-section";
import ExportPDF from "@/widgets/resume/export-pdf";


export default function ResumeForm({ initialData }: any) {
    const {
        data,
        setData,
        sectionOrder,
        reorderSections,
    } = useResumeStore();

    useEffect(() => {
        setData(initialData);
    }, [initialData, setData]);

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = sectionOrder.indexOf(active.id);
            const newIndex = sectionOrder.indexOf(over.id);
            reorderSections(arrayMove(sectionOrder, oldIndex, newIndex));
        }
    }

    return (
        <div className="grid grid-cols-2 gap-10 p-10">
            <div>
                <TemplateSelector />
                <ExportPDF />
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
                        <div className="space-y-6 mt-6">
                            {sectionOrder.map((sectionKey) => (
                                <SortableSection
                                    key={sectionKey}
                                    id={sectionKey}
                                    value={data.blocks?.[sectionKey]}
                                />
                            ))}
                            <AddSection />
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            <div className="relative">
                <ResumePreview />
            </div>
        </div>
    );
}