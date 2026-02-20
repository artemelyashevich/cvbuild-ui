'use client';

import React, { useState, useRef, FormEvent, ClipboardEvent } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import { AxiosError } from "axios";

interface TwoFactorAuthFormProps {
    email: string;
    verify2fa: (code: string) => Promise<void>;
    onBack: () => void;
}

export default function TwoFactorAuthForm({ email, verify2fa, onBack }: Readonly<TwoFactorAuthFormProps>) {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
        if (!value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
        if (pastedData) {
            const newOtp = [...otp];
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i];
            }
            setOtp(newOtp);
            const focusIndex = pastedData.length < 6 ? pastedData.length : 5;
            inputsRef.current[focusIndex]?.focus();
        }
    };

    const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            toast.error('Введите все 6 цифр кода');
            return;
        }

        try {
            setLoading(true);
            await verify2fa(otpCode);
            toast.success('Успешный вход!');

        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || 'Неверный код подтверждения';
            toast.error(errorMessage);

            setOtp(['', '', '', '', '', '']);
            inputsRef.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="rounded-[2.5rem] shadow-xl border border-zinc-100 bg-zinc-50/50 p-8 hover:bg-white hover:border-black hover:shadow-xl transition-all duration-300 w-full max-w-md mx-auto">
            <CardContent className="flex flex-col items-center space-y-6 p-0">

                <div className="w-full flex justify-start">
                    <button
                        onClick={onBack}
                        className="text-zinc-400 hover:text-black transition-colors flex items-center gap-1 text-sm font-medium"
                        type="button"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Назад
                    </button>
                </div>

                <ShieldCheck className="w-16 h-16 text-[#D6FF00] mb-2 drop-shadow-sm" />

                <div className="text-center space-y-2 w-full">
                    <h2 className="text-3xl font-black tracking-tight">Вход по 2FA</h2>
                    <p className="text-zinc-500 text-sm">
                        Введите 6-значный код из приложения-аутентификатора для <span className="font-bold text-zinc-800">{email}</span>
                    </p>
                </div>

                <form className="w-full flex flex-col gap-6" onSubmit={handleOtpSubmit}>
                    <div className="flex justify-between items-center gap-2">
                        {otp.map((digit, idx) => (
                            <Input
                                key={idx}
                                type="tel"
                                inputMode="numeric"
                                pattern="\d*"
                                maxLength={1}
                                value={digit}
                                onPaste={handlePaste}
                                onChange={e => handleOtpChange(idx, e.target.value)}
                                ref={el => { inputsRef.current[idx] = el; }}
                                className="w-12 h-14 text-center text-xl font-black bg-white border-2 border-zinc-200 rounded-[1rem] focus:ring-0 focus:border-[#D6FF00] transition-colors"
                            />
                        ))}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading || otp.join('').length !== 6}
                        className="w-full h-14 rounded-[2rem] bg-[#D6FF00] text-black font-black uppercase tracking-widest hover:brightness-110 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:text-black"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Подтвердить'}
                    </Button>
                </form>

            </CardContent>
        </Card>
    );
}