'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { PlusCircle, XCircle, LayoutTemplate } from "lucide-react";
import { useState } from "react";
import { useTemplateStore } from "@/features/store/template-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Название должно быть не менее 2 символов.",
    }),
    layout: z.object({
        sectionOrder: z.array(z.string()).min(1, {
            message: "Должен быть хотя бы один раздел.",
        }),
        columns: z.coerce.number().min(1).max(3).optional(),
    }),
    styles: z.object({
        header: z.string().min(1, { message: "Заголовок обязателен." }),
        sectionTitle: z.string().min(1, { message: "Заголовок раздела обязателен." }),
        text: z.string().min(1, { message: "Текст обязателен." }),
    }),
    defaultBlocks: z.object({}).catchall(z.any()).optional(),
});

type TemplateFormValues = z.infer<typeof formSchema>;

export function TemplateForm() {
    const router = useRouter();
    const createTemplate = useTemplateStore((state) => state.createTemplate);

    const form = useForm<TemplateFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            layout: {
                sectionOrder: ["personal-details", "experience", "education"],
                columns: 1,
            },
            styles: {
                header: "text-2xl font-bold",
                sectionTitle: "text-xl font-semibold",
                text: "text-base",
            },
            defaultBlocks: {},
        },
    });

    const [newSection, setNewSection] = useState("");

    async function onSubmit(values: TemplateFormValues) {
        try {
            await createTemplate(values);
            toast.success("Шаблон успешно создан!", {
                description: `Шаблон "${values.name}" был сохранен.`,
            });
            router.push("/templates");
        } catch (error) {
            toast.error("Ошибка создания шаблона", {
                description: "Произошла ошибка при сохранении шаблона.",
            });
            console.error(error);
        }
    }

    const handleAddSection = () => {
        if (newSection.trim() && !form.getValues("layout.sectionOrder").includes(newSection.trim())) {
            const currentSections = form.getValues("layout.sectionOrder");
            form.setValue("layout.sectionOrder", [...currentSections, newSection.trim()]);
            setNewSection("");
        }
    };

    const handleRemoveSection = (sectionToRemove: string) => {
        const currentSections = form.getValues("layout.sectionOrder");
        form.setValue(
            "layout.sectionOrder",
            currentSections.filter((section) => section !== sectionToRemove)
        );
    };

    return (
        <Card className="relative overflow-hidden border border-zinc-100 bg-zinc-50/50 shadow-sm rounded-[2.5rem] p-4 md:p-6 lg:p-8">
            <div className="absolute -right-4 -bottom-10 text-[10rem] font-black text-zinc-100 select-none transition-colors pointer-events-none z-0 leading-none opacity-50">
                AI
            </div> {/* Фоновый элемент */}

            <CardContent className="relative z-10 p-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className={cn(
                                "p-4 rounded-2xl bg-white text-black shadow-sm group-hover:bg-[#D6FF00] group-hover:shadow-md group-hover:scale-110"
                            )}>
                                <LayoutTemplate className="w-6 h-6"/>
                            </div>
                            <div>
                                <h2 className="font-bold text-3xl tracking-tight leading-none">Создать новый шаблон</h2>
                                <p className="text-zinc-500 text-sm font-medium leading-relaxed mt-1">
                                    Настройте структуру и стиль вашего шаблона резюме.
                                </p>
                            </div>
                        </div>


                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold text-zinc-700">Название шаблона</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="h-12 text-base rounded-xl border-zinc-200 focus:border-black focus-visible:ring-offset-0 focus-visible:ring-0"
                                            placeholder="Например: 'Классический шаблон'" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Это будет отображаться как название вашего шаблона.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-zinc-700">Порядок разделов</h3>
                            <p className="text-sm text-zinc-500 mb-4">
                                Определите порядок, в котором разделы будут отображаться в резюме.
                            </p>
                            <div className="space-y-2">
                                {form.watch("layout.sectionOrder").map((section, index) => (
                                    <div key={section} className="flex items-center justify-between space-x-2 bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
                                        <span className="flex-grow font-medium text-zinc-800">{section}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveSection(section)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <XCircle className="h-5 w-5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex space-x-2 mt-4">
                                <Input
                                    className="h-12 text-base rounded-xl border-zinc-200 focus:border-black focus-visible:ring-offset-0 focus-visible:ring-0"
                                    placeholder="Добавить новый раздел (e.g., 'навыки')"
                                    value={newSection}
                                    onChange={(e) => setNewSection(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddSection();
                                        }
                                    }}
                                />
                                <Button type="button" onClick={handleAddSection} className="shrink-0 h-12 px-6 rounded-xl bg-black text-white hover:bg-zinc-800 transition-colors">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Добавить
                                </Button>
                            </div>
                            <FormMessage className="mt-2">
                                {form.formState.errors.layout?.sectionOrder?.message}
                            </FormMessage>
                        </div>

                        <FormField
                            control={form.control}
                            name="layout.columns"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold text-zinc-700">Количество колонок</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                        <FormControl>
                                            <SelectTrigger className="w-[180px] h-12 text-base rounded-xl border-zinc-200 focus:border-black focus-visible:ring-offset-0 focus-visible:ring-0">
                                                <SelectValue placeholder="Выберите количество колонок" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="1">1 Колонка</SelectItem>
                                            <SelectItem value="2">2 Колонки</SelectItem>
                                            <SelectItem value="3">3 Колонки</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Определяет, сколько колонок будет в основном макете резюме.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-zinc-700">Стили</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="styles.header"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Стиль заголовка</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-12 text-base rounded-xl border-zinc-200 focus:border-black focus-visible:ring-offset-0 focus-visible:ring-0"
                                                    placeholder="Например: 'text-3xl font-bold'" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Классы Tailwind CSS для основного заголовка (например, имя).
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="styles.sectionTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Стиль заголовка раздела</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-12 text-base rounded-xl border-zinc-200 focus:border-black focus-visible:ring-offset-0 focus-visible:ring-0"
                                                    placeholder="Например: 'text-xl font-semibold'" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Классы Tailwind CSS для заголовков разделов (например, "Опыт работы").
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="styles.text"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Стиль обычного текста</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-12 text-base rounded-xl border-zinc-200 focus:border-black focus-visible:ring-offset-0 focus-visible:ring-0"
                                                    placeholder="Например: 'text-base'" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Классы Tailwind CSS для основного текста.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="defaultBlocks"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold text-zinc-700">Дефолтные блоки (JSON)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder={`{"personal-details": {"name": "Ваше Имя"}}`}
                                            className="min-h-[150px] text-base rounded-xl border-zinc-200 focus:border-black focus-visible:ring-offset-0 focus-visible:ring-0"
                                            value={JSON.stringify(field.value, null, 2)}
                                            onChange={(e) => {
                                                try {
                                                    const parsedValue = JSON.parse(e.target.value);
                                                    field.onChange(parsedValue);
                                                } catch (error) {
                                                    console.error("Неверный JSON формат:", error);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Предварительно заполненные данные для разделов в формате JSON.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <button
                            type="submit"
                            className="group relative w-full bg-[#D6FF00] text-black h-16 px-12 rounded-[2.5rem] font-black uppercase tracking-wider text-sm md:text-base flex items-center justify-center gap-3 transition-all hover:brightness-105 active:scale-95 overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-[2.5rem]"/>

                            <span className="relative flex items-center gap-3">
                                Создать шаблон
                            </span>
                        </button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}