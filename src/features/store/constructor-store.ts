"use client";

import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import {axiosWithToken} from "@/features";

export type TemplateType = {
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
} | null;
export type FieldType = "string" | "number" | "boolean" | "array" | "object";

type ConstructorStore = {
    data: any;
    sectionOrder: string[];
    fieldOrder: Record<string, string[]>;
    template: TemplateType;

    setData: (data: any) => void;
    updateValue: (path: string[], value: any) => void;

    reorderSections: (newOrder: string[]) => void;
    reorderFields: (section: string, oldIndex: number, newIndex: number) => void;

    setTemplate: (template: string) => Promise<any>;

    addSection: (name: string) => void;
    addField: (path: string[], key: string, type: FieldType) => void;
    removeField: (path: string[], key: string) => void;
    renameSection: (oldName: string, newName: string) => void;

    addArrayItem: (path: string[]) => void;
    removeArrayItem: (path: string[], index: number) => void;
    removeSection: (name: string) => void;
};

const createEmptyValueByType = (type: FieldType) => {
    switch (type) {
        case "string":
            return "";
        case "number":
            return 0;
        case "boolean":
            return false;
        case "array":
            return [];
        case "object":
            return {};
    }
};

export const useConstructorStore = create<ConstructorStore>((set) => ({
    data: {},
    sectionOrder: [],
    fieldOrder: {},
    template: null,

    setData: (data) =>
        set(() => {
            const sectionOrder = Object.keys(data.blocks || {});
            const fieldOrder: Record<string, string[]> = {};

            sectionOrder.forEach((section) => {
                fieldOrder[section] = Object.keys(data.blocks[section] || {});
            });

            return { data, sectionOrder, fieldOrder };
        }),

    updateValue: (path, value) =>
        set((state) => {
            const newData = structuredClone(state.data);
            let current = newData;

            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }

            current[path[path.length - 1]] = value;
            return { data: newData };
        }),

    reorderSections: (newOrder) => set({ sectionOrder: newOrder }),

    reorderFields: (section, oldIndex, newIndex) =>
        set((state) => ({
            fieldOrder: {
                ...state.fieldOrder,
                [section]: arrayMove(state.fieldOrder[section], oldIndex, newIndex),
            },
        })),

    setTemplate: async (templateId: string): Promise<void> => {
        const res = await axiosWithToken(`/templates/${templateId}`);
        const template = await res.data();

        set({
            template,
            data: {
                blocks: template.defaultBlocks
            },
            sectionOrder: template.layout.sectionOrder
        });
    },

    addSection: (name) =>
        set((state) => ({
            data: {
                ...state.data,
                blocks: { ...state.data.blocks, [name]: {} },
            },
            sectionOrder: [...state.sectionOrder, name],
            fieldOrder: { ...state.fieldOrder, [name]: [] },
        })),

    addField: (path, key, type) =>
        set((state) => {
            const newData = structuredClone(state.data);
            let current = newData;

            for (let i = 0; i < path.length; i++) {
                current = current[path[i]];
            }

            current[key] = createEmptyValueByType(type);

            const section = path[1];

            return {
                data: newData,
                fieldOrder: {
                    ...state.fieldOrder,
                    [section]: [...(state.fieldOrder[section] || []), key],
                },
            };
        }),

    removeField: (path, key) =>
        set((state) => {
            const newData = structuredClone(state.data);
            let current = newData;

            for (let i = 0; i < path.length; i++) {
                current = current[path[i]];
            }

            delete current[key];

            const section = path[1];

            return {
                data: newData,
                fieldOrder: {
                    ...state.fieldOrder,
                    [section]: state.fieldOrder[section].filter((k) => k !== key),
                },
            };
        }),

    renameSection: (oldName, newName) =>
        set((state) => {
            if (!newName.trim() || oldName === newName) return state;

            const newData = structuredClone(state.data);

            newData.blocks[newName] = newData.blocks[oldName];
            delete newData.blocks[oldName];

            const newSectionOrder = state.sectionOrder.map((s) =>
                s === oldName ? newName : s
            );

            const newFieldOrder = { ...state.fieldOrder };
            newFieldOrder[newName] = newFieldOrder[oldName];
            delete newFieldOrder[oldName];

            return {
                data: newData,
                sectionOrder: newSectionOrder,
                fieldOrder: newFieldOrder,
            };
        }),
    addArrayItem: (path) =>
        set((state) => {
            const newData = structuredClone(state.data);
            let current = newData;

            for (let i = 0; i < path.length; i++) {
                current = current[path[i]];
            }

            if (!Array.isArray(current)) return state;

            current.push("");

            return { data: newData };
        }),

    removeArrayItem: (path, index) =>
        set((state) => {
            const newData = structuredClone(state.data);
            let current = newData;

            for (let i = 0; i < path.length; i++) {
                current = current[path[i]];
            }

            if (!Array.isArray(current)) return state;

            current.splice(index, 1);

            return { data: newData };
        }),

    removeSection: (name) =>
        set((state) => {
            const newData = structuredClone(state.data);

            delete newData.blocks[name];

            const newSectionOrder = state.sectionOrder.filter(
                (s) => s !== name
            );

            const newFieldOrder = { ...state.fieldOrder };
            delete newFieldOrder[name];

            return {
                data: newData,
                sectionOrder: newSectionOrder,
                fieldOrder: newFieldOrder,
            };
        }),
}));