'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthRequest } from "@/entities";
import { AuthService } from "@/service/AuthService";
import { LoginButton } from "@/widgets";
import { AxiosError } from 'axios';
import * as z from 'zod';

import TwoFactorAuthForm from './TwoFactorAuthForm';

const authSchema = z.object({
    firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа').optional(),
    lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа').optional(),
    email: z.string().email('Некорректный email'),
    password: z.string().min(4, 'Пароль должен содержать минимум 6 символов'),
});

type AuthFormData = z.infer<typeof authSchema>;

export function Auth() {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const [is2faStep, setIs2faStep] = useState<boolean>(false);
    const [authEmail, setAuthEmail] = useState<string>('');

    const { push } = useRouter();

    const form = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: AuthRequest) =>
            isLogin ? AuthService.login(data) : AuthService.register(data),
        onSuccess: (response: any) => {
            if (response?.mfaRequired) {
                setIs2faStep(true);
                toast.info('Требуется двухфакторная аутентификация');
            } else {
                toast.success(isLogin ? 'Успешный вход!' : 'Регистрация выполнена!');
                form.reset();
                setServerError(null);
                push("/profile");
            }
        },
        onError: (err) => {
            let message = 'Ошибка аутентификации';
            if (err instanceof AxiosError && err.response?.data?.message) {
                message = err.response.data.message;
            } else if (err instanceof Error) {
                message = err.message;
            }
            setServerError(message);
            toast.error(message);
            console.error('Auth error:', err);
        }
    });

    const onSubmit: SubmitHandler<AuthFormData> = (data) => {
        setServerError(null);
        setAuthEmail(data.email);

        const payload: AuthRequest = {
            email: data.email,
            password: data.password,
            ...(isLogin ? {} : { firstName: data.firstName!, lastName: data.lastName! }),
        };
        mutate(payload);
    };

    const handleVerify2fa = async (code: string) => {
        await AuthService.verify2fa({ email: authEmail, code });

        form.reset();
        push("/profile");
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 md:h-screen font-sans bg-zinc-50">

            {is2faStep ? (
                <TwoFactorAuthForm
                    email={authEmail}
                    verify2fa={handleVerify2fa}
                    onBack={() => {
                        setIs2faStep(false);
                        setServerError(null);
                    }}
                />
            ) : (
                <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-10">
                    <h1 className="text-2xl md:text-3xl font-black text-center mb-8">
                        {isLogin ? 'Вход' : 'Регистрация'}
                    </h1>

                    <Form {...form}>
                        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

                            {!isLogin && <>
                                <FormField control={form.control} name="firstName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Имя"
                                                className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D6FF00]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="lastName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Фамилия</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Фамилия"
                                                className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D6FF00]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </>}

                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Email"
                                            className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D6FF00]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Пароль"
                                            className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#D6FF00]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-[2rem] bg-[#D6FF00] text-black font-black uppercase tracking-widest hover:brightness-110 hover:text-white transition-all"
                                disabled={isPending}
                            >
                                {isPending ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
                            </Button>

                            <p className="text-center text-sm text-zinc-500 mt-2">
                                {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                                <span
                                    className="cursor-pointer font-bold text-black hover:underline"
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? 'Регистрация' : 'Вход'}
                                </span>
                            </p>

                            <div className="pt-2 flex justify-center">
                                <LoginButton />
                            </div>

                            {serverError && (
                                <p className="text-red-600 text-center mt-2">{serverError}</p>
                            )}
                        </form>
                    </Form>
                </div>
            )}
        </div>
    );
}