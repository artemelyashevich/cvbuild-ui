"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2, User, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AvatarUpload } from "./avatar-upload";
import { IProfile } from "@/entities";
import { cn } from "@/lib/utils";

import useUpdateProfile from "@/features/hooks/use-update-profile";
import useUploadFile from "@/features/hooks/use-upload-file";

const profileSchema = z.object({
    firstName: z.string().min(2, "Имя слишком короткое"),
    lastName: z.string().min(2, "Фамилия слишком короткая"),
    email: z.string().email("Некорректный email"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm({ user }: Readonly<{ user: IProfile }>) {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
    const { mutateAsync: uploadAvatar, isPending: isUploadingAvatar } = useUploadFile();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
        },
    });

    const isPending = isUpdatingProfile || isUploadingAvatar;

    const initials = useMemo(() => {
        return `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();
    }, [user]);

    const onSubmit = async (values: ProfileFormValues) => {
        try {
            const promises: Promise<any>[] = [updateProfile(values)];
            if (selectedFile && user.id) {
                promises.push(uploadAvatar({ file: selectedFile, userId: user.id }));
            }
            await Promise.all(promises);
            toast.success("Данные успешно сохранены");
            router.refresh();
        } catch (error) {
            toast.error("Ошибка при обновлении");
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Заголовок в стиле лендинга */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                    Ваш <span className="relative inline-block">
            <span className="absolute inset-0 bg-[#D6FF00] -rotate-1 skew-x-3 rounded-lg -z-10" />
            <span className="relative px-3 text-black">Профиль</span>
          </span>
                </h1>
                <p className="text-zinc-500 font-medium tracking-tight ">
                    Настройте личные данные для автоматического заполнения резюме
                </p>
            </div>

            <Card className="border-zinc-100 bg-zinc-50/50 shadow-sm rounded-[2.5rem] overflow-hidden border-none">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
                        <CardHeader className="p-8 pb-4">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-[#D6FF00] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                    <AvatarUpload
                                        avatarUrl={user?.avatarUrl}
                                        initials={initials}
                                        onFileSelect={setSelectedFile}
                                    />
                                </div>
                                <div className="text-center md:text-left space-y-1">
                                    <CardTitle className="text-2xl font-bold tracking-tight">Фото профиля</CardTitle>
                                    <CardDescription className="max-w-xs">
                                        Используйте профессиональное фото. Это повышает доверие рекрутеров на 40%.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-8 pt-4 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs uppercase tracking-widest font-bold text-zinc-400 ml-1">Имя</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        className="h-14 pl-11 rounded-2xl border-zinc-200 bg-white focus:border-[#D6FF00] focus:ring-[#D6FF00] transition-all"
                                                        placeholder="Иван"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-[10px] uppercase font-bold" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs uppercase tracking-widest font-bold text-zinc-400 ml-1">Фамилия</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        className="h-14 pl-11 rounded-2xl border-zinc-200 bg-white focus:border-[#D6FF00] focus:ring-[#D6FF00] transition-all"
                                                        placeholder="Иванов"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-[10px] uppercase font-bold" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel className="text-xs uppercase tracking-widest font-bold text-zinc-400 ml-1">Электронная почта</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        disabled={isPending}
                                                        className="h-14 pl-11 rounded-2xl border-zinc-200 bg-white focus:border-[#D6FF00] focus:ring-[#D6FF00] transition-all"
                                                        placeholder="example@mail.com"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-[10px] uppercase font-bold" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={isPending || (!form.formState.isDirty && !selectedFile)}
                                    className={cn(
                                        "w-full h-16 rounded-[2rem] text-base font-black uppercase tracking-wider transition-all duration-300",
                                        "bg-black text-white hover:bg-[#D6FF00] hover:text-black shadow-xl",
                                        isPending && "opacity-80"
                                    )}
                                >
                                    {isPending ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Сохранить изменения
                    </span>
                                    )}
                                </Button>
                                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mt-4">
                                    Данные защищены сквозным шифрованием
                                </p>
                            </div>
                        </CardContent>
                    </form>
                </Form>
            </Card>
        </div>
    );
}