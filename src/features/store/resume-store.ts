import { create } from 'zustand';

export interface WorkExperience {
    id: string;
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
}

export interface Education {
    id: string;
    schoolName: string;
    degree: string;
    startDate: string;
    endDate: string;
}

interface ResumeState {
    linkedin: string;
    workExperiences: WorkExperience[];
    currentJobName: string;
    education: Education[];
    skills: string[];
    highlights: string;
    careerGoals: string;

    setLinkedin: (val: string) => void;
    addWorkExperience: (val: WorkExperience) => void;
    removeWorkExperience: (id: string) => void;
    setJobName: (val: string) => void;
    addEducation: (val: Education) => void;
    removeEducation: (id: string) => void;
    setSkills: (val: string[]) => void;
    setHighlights: (val: string) => void;
    setCareerGoals: (val: string) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
    linkedin: '',
    workExperiences: [],
    currentJobName: '',
    education: [],
    skills: [],
    highlights: '',
    careerGoals: '',

    setLinkedin: (val) => set({ linkedin: val }),

    addWorkExperience: (val) =>
        set((s) => ({ workExperiences: [...s.workExperiences, val] })),

    removeWorkExperience: (id) =>
        set((s) => ({
            workExperiences: s.workExperiences.filter((w) => w.id !== id),
        })),

    setJobName: (val) => set({ currentJobName: val }),

    addEducation: (val) =>
        set((s) => ({ education: [...s.education, val] })),

    removeEducation: (id) =>
        set((s) => ({
            education: s.education.filter((e) => e.id !== id),
        })),

    setSkills: (val) => set({ skills: val }),
    setHighlights: (val) => set({ highlights: val }),
    setCareerGoals: (val) => set({ careerGoals: val }),
}));