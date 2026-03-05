'use client';

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
    // Personal Information
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    // Links & Profile
    linkedin: string;
    github: string;
    portfolio: string;

    // Work & Education
    workExperiences: WorkExperience[];
    currentJobName: string;
    education: Education[];

    // Skills / Highlights / Career
    skills: string[];
    highlights: string;
    careerGoals: string;

    // Setters
    setFirstName: (val: string) => void;
    setLastName: (val: string) => void;
    setEmail: (val: string) => void;
    setPhone: (val: string) => void;
    setLinkedin: (val: string) => void;
    setGithub: (val: string) => void;
    setPortfolio: (val: string) => void;

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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    workExperiences: [],
    currentJobName: '',
    education: [],
    skills: [],
    highlights: '',
    careerGoals: '',

    setFirstName: (val) => set({ firstName: val }),
    setLastName: (val) => set({ lastName: val }),
    setEmail: (val) => set({ email: val }),
    setPhone: (val) => set({ phone: val }),
    setLinkedin: (val) => set({ linkedin: val }),
    setGithub: (val) => set({ github: val }),
    setPortfolio: (val) => set({ portfolio: val }),

    addWorkExperience: (val) => set((s) => ({ workExperiences: [...s.workExperiences, val] })),
    removeWorkExperience: (id) => set((s) => ({ workExperiences: s.workExperiences.filter((w) => w.id !== id) })),
    setJobName: (val) => set({ currentJobName: val }),

    addEducation: (val) => set((s) => ({ education: [...s.education, val] })),
    removeEducation: (id) => set((s) => ({ education: s.education.filter((e) => e.id !== id) })),

    setSkills: (val) => set({ skills: val }),
    setHighlights: (val) => set({ highlights: val }),
    setCareerGoals: (val) => set({ careerGoals: val }),
}));