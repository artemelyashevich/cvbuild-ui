"use client";

import {useEffect} from "react";
import {
    DndContext,
    closestCenter,
    DragEndEvent
} from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

import SortableSection from "@/widgets/resume/sortable-section";
import {useConstructorStore} from "@/features/store/constructor-store";
import TemplateSelector from "@/widgets/template/template-selector";
import ResumePreview from "@/widgets/resume/resume-preview";
import AddSection from "@/widgets/resume/add-section";
import ExportPDF from "@/widgets/resume/export-pdf";
import VacancyAdapter from "@/widgets/resume/vacancy-adapter";

export default function ResumeForm({initialData}: any) {
    const {
        data,
        setData,
        sectionOrder,
        reorderSections,
    } = useConstructorStore();

    useEffect(() => {
        setData(initialData);
    }, [initialData, setData]);

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (!over || active.id === over.id) return;

        const oldIndex = sectionOrder.indexOf(active.id as string);
        const newIndex = sectionOrder.indexOf(over.id as string);

        reorderSections(arrayMove(sectionOrder, oldIndex, newIndex));
    };

    return (
        <div className="min-h-screen bg-zinc-50">
            <div className="max-w mx-auto px-6 py-10 space-y-10">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
                            Конструктор резюме
                        </h1>
                        <p className="text-zinc-500 text-sm mt-2 max-w-md">
                            Перетаскивайте секции, редактируйте содержимое и сразу
                            смотрите результат
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                        <TemplateSelector/>
                        <ExportPDF/>
                    </div>
                </div>
                <VacancyAdapter/>

                <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 items-start">

                    {/* LEFT: Editor */}
                    <div className="space-y-6">

                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={sectionOrder}
                                strategy={verticalListSortingStrategy}
                            >
                                {sectionOrder.length > 0 ? (
                                    <div className="space-y-6">
                                        {sectionOrder.map((sectionKey) => (
                                            <SortableSection
                                                key={sectionKey}
                                                id={sectionKey}
                                                value={data.blocks?.[sectionKey]}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 text-zinc-400">
                                        <p className="text-lg font-medium">
                                            Пока нет секций
                                        </p>
                                        <p className="text-sm mt-1">
                                            Добавьте первую секцию, чтобы начать
                                        </p>
                                    </div>
                                )}

                                <div className="pt-4">
                                    <AddSection/>
                                </div>

                            </SortableContext>
                        </DndContext>
                    </div>

                    <div className="sticky top-20 h-[calc(100vh-3rem)]">
                        <div
                            className="h-full rounded-[2rem] border border-zinc-200 bg-white shadow-2xl overflow-hidden">
                            <ResumePreview/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}