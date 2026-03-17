"use client";

import { create } from "zustand";
import {TemplateService} from "@/service/TemplateService";

export type ResumeTemplate = {
    id: string;
    name: string;
    layout: {
        sectionOrder: string[];
        columns?: number;
    };
    styles: {
        header: string;
        sectionTitle: string;
        text: string;
    };
    defaultBlocks: Record<string, any>;
};

type TemplateStore = {
    templates: ResumeTemplate[];
    currentTemplate: ResumeTemplate | null;

    fetchTemplates: () => Promise<void>;
    selectTemplate: (id: string) => Promise<void>;
    createTemplate: (data: Partial<ResumeTemplate>) => Promise<void>;
};

export const useTemplateStore = create<TemplateStore>((set) => ({
    templates: [],
    currentTemplate: null,

    fetchTemplates: async () => {
        const templates = await TemplateService.findAll();
        set({ templates });
    },

    selectTemplate: async (name) => {
        const template = await TemplateService.findByName(name);
        set({ currentTemplate: template });
    },

    createTemplate: async (data) => {
        const created = await TemplateService.create(data);
        set((state) => ({
            templates: [...state.templates, created],
        }));
    },
}));