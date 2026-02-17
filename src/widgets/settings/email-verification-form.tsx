'use client';

import React, {useState, useRef, FormEvent} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Loader2, Mail, Check, XCircle} from "lucide-react";
import {useAuth} from "@/features";
import {AxiosError} from "axios";

interface VerifyEmailProps {
    sendOtp: (email: string) => Promise<void>;
    verifyOtp: (email: string, otp: string) => Promise<void>;
}

export default function VerifyEmailFlow({sendOtp, verifyOtp}: Readonly<VerifyEmailProps>) {
    const [step, setStep] = useState<'email' | 'otp' | 'result'>('email');
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const {user} = useAuth()

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    // ----------------------- Email Step -----------------------
    const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await sendOtp(user?.email);
            toast.success('Код отправлен на почту');
            setStep('otp');
        } catch (err: AxiosError) {
            const data = await err.response?.data
            toast.error(JSON.stringify(data.message));
        } finally {
            setLoading(false);
        }
    };

    // ----------------------- OTP Step -----------------------
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

    const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            toast.error('Введите все 6 цифр кода');
            return;
        }

        try {
            setLoading(true);
            await verifyOtp(user?.email, otpCode);
            setSuccess(true);
            setStep('result');
            toast.success('Email успешно верифицирован!');
        } catch (err) {
            console.error(err);
            setSuccess(false);
            setStep('result');
            toast.error('Неверный код или ошибка сервера');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            className="rounded-[2.5rem] shadow-xl border border-zinc-100 bg-zinc-50/50 p-8 hover:bg-white hover:border-black hover:shadow-xl transition-all duration-300">
            <CardContent className="flex flex-col items-center space-y-6">

                {step === 'email' && (
                    <>
                        <Mail className="w-12 h-12 text-[#D6FF00] mb-4"/>
                        <h2 className="text-3xl font-black tracking-tight text-center">Введите Email</h2>
                        <form className="w-full space-y-6" onSubmit={handleEmailSubmit}>
                            <Button
                                type="submit"
                                className="w-full h-14 rounded-[2rem] bg-[#D6FF00] text-black font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Отправить код'}
                            </Button>
                        </form>
                    </>
                )}

                {step === 'otp' && (
                    <>
                        <h2 className="text-3xl font-black tracking-tight text-center">Введите 6-значный код</h2>
                        <p className="text-zinc-500 text-sm text-center mb-4">
                            Код отправлен на <span className="font-bold">{user?.email}</span>
                        </p>
                        <form className="flex flex-col justify-between gap-2" onSubmit={handleOtpSubmit}>
                            <div className="flex items-center gap-2">
                                {otp.map((digit, idx) => (
                                    <Input
                                        key={idx}
                                        type="tel"
                                        inputMode="numeric"
                                        pattern="\d*"
                                        maxLength={1}
                                        value={digit}
                                        onInput={e => handleOtpChange(idx, (e.target as HTMLInputElement).value)}
                                        ref={el => (inputsRef.current[idx] = el)}
                                        className="w-12 h-14 text-center text-xl font-bold bg-zinc-50 border border-zinc-200 rounded-[1rem] focus:ring-2 focus:ring-[#D6FF00] focus:border-[#D6FF00]"
                                    />
                                ))}
                            </div>
                            <Button
                                type="submit"
                                className="w-full hover:text-white h-14 rounded-[2rem] bg-[#D6FF00] text-black font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Подтвердить'}
                            </Button>
                        </form>
                    </>
                )}

                {step === 'result' && (
                    <>
                        {success ? (
                            <>
                                <Check className="w-12 h-12 text-[#D6FF00] mb-4"/>
                                <h2 className="text-3xl font-black tracking-tight text-center">Email подтвержден!</h2>
                                <p className="text-zinc-500 text-center mt-2">Теперь вы можете продолжить.</p>
                            </>
                        ) : (
                            <>
                                <XCircle className="w-12 h-12 text-red-500 mb-4"/>
                                <h2 className="text-3xl font-black tracking-tight text-center">Ошибка</h2>
                                <p className="text-zinc-500 text-center mt-2">Неверный код или ошибка сервера.</p>
                                <Button
                                    className="mt-4 w-full h-14 rounded-[2rem] bg-[#D6FF00] text-black font-black uppercase tracking-widest hover:brightness-110 transition-all"
                                    onClick={() => setStep('otp')}
                                >
                                    Попробовать снова
                                </Button>
                            </>
                        )}
                    </>
                )}
            </CardContent>
        </Card>

    );
}
