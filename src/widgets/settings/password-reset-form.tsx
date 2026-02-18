"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {axiosWithToken} from "@/features";

type FormValues = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export default function PasswordResetForm() {
    const { register, handleSubmit, watch, formState, reset } = useForm<FormValues>();
    const { errors } = formState;
    const newPassword = watch("newPassword");

    const mutation = useMutation({
        mutationFn: async (data: FormValues) => {
            return axiosWithToken.post("/settings/reset-password", {
                oldPassword: data.currentPassword,
                newPassword: data.newPassword,
                confirmedNewPassword: data.confirmPassword,
            });
        },
    });

    const onSubmit = (data: FormValues) => {
        mutation.mutate(data, {
            onSuccess: () => reset(),
        });
    };

    return (
        <Card className="rounded-[2.5rem] shadow-xl border border-zinc-100 bg-zinc-50/50 p-8 hover:bg-white hover:border-black hover:shadow-xl transition-all duration-300">
            <CardHeader>
                <CardTitle>Изменение пароля</CardTitle>
                <CardDescription>Рекомендуется использовать сложный пароль.</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Текущий пароль</Label>
                        <Input
                            type="password"
                            {...register("currentPassword", { required: "Введите текущий пароль" })}
                        />
                        {errors.currentPassword && (
                            <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Новый пароль</Label>
                        <Input
                            type="password"
                            {...register("newPassword", {
                                required: "Введите новый пароль",
                                minLength: { value: 6, message: "Минимум 6 символов" },
                            })}
                        />
                        {errors.newPassword && (
                            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Подтвердите пароль</Label>
                        <Input
                            type="password"
                            {...register("confirmPassword", {
                                required: "Подтвердите пароль",
                                validate: (value) => value === newPassword || "Пароли не совпадают",
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {mutation.isError && (
                        <div className="text-sm text-red-600">
                            {(mutation.error as any)?.response?.data?.message || "Ошибка при смене пароля"}
                        </div>
                    )}

                    {mutation.isSuccess && (
                        <div className="text-sm text-green-600">Пароль успешно обновлён</div>
                    )}
                </CardContent>

                <CardFooter className="border-t px-6 py-4 flex justify-between">
                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="hover:text-white w-full h-14 rounded-[2rem] bg-[#D6FF00] text-black font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                        {mutation.isPending ? "Обновление..." : "Обновить пароль"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
