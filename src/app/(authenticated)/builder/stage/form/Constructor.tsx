'use client'

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    User, Briefcase, GraduationCap,
    Wrench, Trophy, Folder,
    Users, Trash2, Plus, Download, Mail, Phone, MapPin, Globe, X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ResumeBuilder({ initialData }: { initialData: any }) {
    const [resume, setResume] = useState(initialData);

    // Универсальная функция обновления вложенных полей
    const updateValue = (path: string, value: any) => {
        const newResume = { ...resume };
        const keys = path.split('.');
        let current = newResume;

        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setResume(newResume);
    };

    // Добавление элемента в объектный блок (например, workExperience)
    const addItem = (blockPath: string, prefix: string) => {
        const newResume = { ...resume };
        const block = blockPath.split('.').reduce((obj, key) => obj[key], newResume);
        const newId = `${prefix}${Date.now()}`;

        // Шаблон нового элемента (можно расширить под разные типы)
        const newItem = prefix === 'company' ? { name: "", position: "", startDate: "", endDate: "" } :
            prefix === 'project' ? { name: "", description: "", technologiesUsed: [] } :
                { name: "", position: "" };

        block[newId] = newItem;
        setResume(newResume);
    };

    // Удаление элемента
    const removeItem = (blockPath: string, itemKey: string) => {
        const newResume = { ...resume };
        const block = blockPath.split('.').reduce((obj, key) => obj[key], newResume);
        delete block[itemKey];
        setResume({ ...newResume });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-background border-t print:bg-white">
            {/* ЛЕВАЯ ЧАСТЬ: РЕДАКТОР (Скрываем при печати) */}
            <aside className="w-full lg:w-1/2 border-r bg-muted/10 overflow-y-auto print:hidden">
                <div className="p-6 max-w-2xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-extrabold tracking-tight">Конструктор</h1>
                            <p className="text-sm text-muted-foreground">ID: {resume.id.slice(-6)}</p>
                        </div>
                        <Button onClick={handlePrint} className="gap-2">
                            <Download className="w-4 h-4" /> PDF
                        </Button>
                    </div>

                    <Tabs defaultValue="personal" className="w-full">
                        <TabsList className="grid grid-cols-4 md:grid-cols-7 h-auto gap-1 bg-muted p-1">
                            <TabsTrigger value="personal" className="px-2 py-2"><User className="w-4 h-4" /></TabsTrigger>
                            <TabsTrigger value="work" className="px-2 py-2"><Briefcase className="w-4 h-4" /></TabsTrigger>
                            <TabsTrigger value="edu" className="px-2 py-2"><GraduationCap className="w-4 h-4" /></TabsTrigger>
                            <TabsTrigger value="skills" className="px-2 py-2"><Wrench className="w-4 h-4" /></TabsTrigger>
                            <TabsTrigger value="projects" className="px-2 py-2"><Folder className="w-4 h-4" /></TabsTrigger>
                            <TabsTrigger value="achv" className="px-2 py-2"><Trophy className="w-4 h-4" /></TabsTrigger>
                            <TabsTrigger value="refs" className="px-2 py-2"><Users className="w-4 h-4" /></TabsTrigger>
                        </TabsList>

                        {/* Личные данные */}
                        <TabsContent value="personal" className="space-y-4 pt-4">
                            <Card className="p-4 space-y-4">
                                <h3 className="font-bold flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Личная информация</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Имя</Label>
                                        <Input
                                            value={resume.blocks.personalInfo.name}
                                            onChange={(e) => updateValue('blocks.personalInfo.name', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Фамилия</Label>
                                        <Input
                                            value={resume.blocks.personalInfo.surname}
                                            onChange={(e) => updateValue('blocks.personalInfo.surname', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input value={resume.blocks.personalInfo.email} onChange={(e) => updateValue('blocks.personalInfo.email', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Телефон</Label>
                                        <Input value={resume.blocks.personalInfo.phone} onChange={(e) => updateValue('blocks.personalInfo.phone', e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Адрес</Label>
                                    <Input value={resume.blocks.personalInfo.address} onChange={(e) => updateValue('blocks.personalInfo.address', e.target.value)} />
                                </div>
                            </Card>
                        </TabsContent>

                        {/* Опыт работы */}
                        <TabsContent value="work" className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">Опыт работы</h3>
                                <Button size="sm" variant="outline" onClick={() => addItem('blocks.workExperience', 'company')}>
                                    <Plus className="w-4 h-4 mr-2" /> Добавить
                                </Button>
                            </div>
                            {Object.entries(resume.blocks.workExperience).map(([key, work]: any) => (
                                <Card key={key} className="p-4 relative">
                                    <Button
                                        variant="ghost" size="icon"
                                        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                                        onClick={() => removeItem('blocks.workExperience', key)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <div className="grid gap-3">
                                        <div className="space-y-1">
                                            <Label>Компания</Label>
                                            <Input
                                                value={work.name}
                                                onChange={(e) => updateValue(`blocks.workExperience.${key}.name`, e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label>Должность</Label>
                                            <Input value={work.position} onChange={(e) => updateValue(`blocks.workExperience.${key}.position`, e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-1">
                                                <Label>Начало</Label>
                                                <Input value={work.startDate} onChange={(e) => updateValue(`blocks.workExperience.${key}.startDate`, e.target.value)} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label>Конец</Label>
                                                <Input value={work.endDate} onChange={(e) => updateValue(`blocks.workExperience.${key}.endDate`, e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </TabsContent>

                        {/* Навыки */}
                        <TabsContent value="skills" className="space-y-4 pt-4">
                            <Card className="p-4 space-y-4">
                                <h3 className="font-bold">Навыки программирования</h3>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {resume.blocks.skills.programmingLanguages.map((lang: string, idx: number) => (
                                        <Badge key={idx} variant="secondary" className="gap-1 px-3 py-1">
                                            {lang}
                                            <X
                                                className="w-3 h-3 cursor-pointer hover:text-destructive"
                                                onClick={() => {
                                                    const newLangs = resume.blocks.skills.programmingLanguages.filter((_: any, i: number) => i !== idx);
                                                    updateValue('blocks.skills.programmingLanguages', newLangs);
                                                }}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                                <Input
                                    placeholder="Введите навык и нажмите Enter"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = e.currentTarget.value.trim();
                                            if (val) {
                                                updateValue('blocks.skills.programmingLanguages', [...resume.blocks.skills.programmingLanguages, val]);
                                                e.currentTarget.value = '';
                                            }
                                        }
                                    }}
                                />
                            </Card>
                        </TabsContent>

                        {/* Остальные вкладки реализуются по аналогии с использованием updateValue... */}
                    </Tabs>
                </div>
            </aside>

            {/* ПРАВАЯ ЧАСТЬ: ПРЕДПРОСМОТР */}
            <main className="w-full lg:w-1/2 bg-muted/40 p-4 md:p-8 flex justify-center overflow-y-auto print:p-0 print:bg-white">
                <div id="resume-preview" className="bg-white shadow-2xl w-[210mm] min-h-[297mm] h-fit p-[40px] text-slate-900 flex flex-col gap-6 ring-1 ring-black/5 print:shadow-none print:ring-0">

                    {/* Header */}
                    <header className="space-y-4 border-b-2 border-slate-900 pb-6 text-center lg:text-left">
                        <h1 className="text-4xl font-black uppercase tracking-tight leading-none text-slate-900">
                            {resume.blocks.personalInfo.name || "Имя"} {resume.blocks.personalInfo.surname || "Фамилия"}
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-[12px] font-medium text-slate-600">
                            {resume.blocks.personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {resume.blocks.personalInfo.email}</div>}
                            {resume.blocks.personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {resume.blocks.personalInfo.phone}</div>}
                            {resume.blocks.personalInfo.address && <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {resume.blocks.personalInfo.address}</div>}
                            <div className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> linkedin.com/in/username</div>
                        </div>
                    </header>

                    {/* Education */}
                    <section>
                        <h2 className="text-[14px] font-black uppercase tracking-widest border-b border-slate-200 mb-3 pb-1 flex items-center gap-2 text-slate-900">
                            <GraduationCap className="w-4 h-4" /> Образование
                        </h2>
                        <div className="space-y-2">
                            <div className="flex justify-between font-bold text-sm">
                                <span>{resume.blocks.education.university}</span>
                                <span>{resume.blocks.education.graduationYear}</span>
                            </div>
                            <p className="text-sm text-slate-700">{resume.blocks.education.faculty} — {resume.blocks.education.degree}</p>
                        </div>
                    </section>

                    {/* Experience */}
                    <section>
                        <h2 className="text-[14px] font-black uppercase tracking-widest border-b border-slate-200 mb-3 pb-1 flex items-center gap-2 text-slate-900">
                            <Briefcase className="w-4 h-4" /> Опыт работы
                        </h2>
                        <div className="space-y-5">
                            {Object.entries(resume.blocks.workExperience).map(([key, work]: any) => (
                                work.name && (
                                    <div key={key} className="space-y-1">
                                        <div className="flex justify-between font-bold text-sm">
                                            <span className="text-slate-900">{work.name}</span>
                                            <span className="text-[11px] font-normal text-slate-500 uppercase">
                                                {work.startDate} — {work.endDate || 'Present'}
                                            </span>
                                        </div>
                                        <p className="text-sm italic font-semibold text-slate-700">{work.position}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="text-[14px] font-black uppercase tracking-widest border-b border-slate-200 mb-3 pb-1 flex items-center gap-2 text-slate-900">
                            <Wrench className="w-4 h-4" /> Навыки
                        </h2>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            <div className="text-sm">
                                <span className="font-bold text-slate-700 mr-2 uppercase text-[11px]">Технологии:</span>
                                {resume.blocks.skills.programmingLanguages.join(', ')}
                            </div>
                        </div>
                    </section>

                    {/* Добавьте остальные секции аналогично... */}
                </div>
            </main>

            {/* Стили для печати */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        background: white;
                    }
                    aside {
                        display: none !important;
                    }
                    main {
                        padding: 0 !important;
                        margin: 0 !important;
                        width: 100% !important;
                        display: block !important;
                    }
                    #resume-preview {
                        box-shadow: none !important;
                        border: none !important;
                        width: 210mm !important;
                        height: 297mm !important;
                        padding: 20mm !important;
                    }
                }
            `}</style>
        </div>
    );
}