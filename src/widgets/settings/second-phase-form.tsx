"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck, Loader2, Smartphone } from "lucide-react";
import useEnable2fa from "@/features/hooks/use-2fa-enable";
import {useAuth} from "@/features";

export default function SecondPhaseForm() {
    const { mutate, loading, error } = useEnable2fa();
    const {user} = useAuth()
    const [isSuccess, setIsSuccess] = useState(user?.secondAuthPhase);

    const handleEnable2fa = () => {
        mutate(undefined, {
            onSuccess: () => {
                setIsSuccess(true);
            },
        });
    };

    return (
        <Card className="rounded-[2.5rem] shadow-xl border border-zinc-100 bg-zinc-50/50 p-8 hover:bg-white hover:border-black hover:shadow-xl transition-all duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {isSuccess ? (
                        <ShieldCheck className="w-6 h-6 text-green-500" />
                    ) : (
                        <ShieldAlert className="w-6 h-6 text-amber-500" />
                    )}
                    Двухфакторная аутентификация (2FA)
                </CardTitle>
                <CardDescription>
                    Защитите свою учетную запись, добавив дополнительный уровень безопасности.
                    При входе в систему потребуется вводить код подтверждения.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-100/50 border border-zinc-200">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                        <Smartphone className="w-6 h-6 text-zinc-700" />
                    </div>
                    <div>
                        <p className="font-medium text-zinc-900">
                            Статус: {isSuccess ? "Включена" : "Отключена"}
                        </p>
                        <p className="text-sm text-zinc-500">
                            {isSuccess
                                ? "Ваш аккаунт надежно защищен."
                                : "Рекомендуем включить для защиты ваших данных."}
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                        {(error as any)?.response?.data?.message || "Произошла ошибка при включении 2FA"}
                    </div>
                )}
            </CardContent>

            <CardFooter className="border-t px-6 py-4 flex justify-between">
                <Button
                    type="button"
                    onClick={handleEnable2fa}
                    disabled={loading || isSuccess}
                    className={`w-full h-14 rounded-[2rem] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2
                        ${isSuccess
                        ? "bg-green-500 text-white cursor-not-allowed hover:bg-green-500"
                        : "bg-[#D6FF00] text-black hover:text-white hover:brightness-110"
                    }`}
                >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    {!loading && isSuccess && "2FA АКТИВИРОВАНА"}
                    {!loading && !isSuccess && "ВКЛЮЧИТЬ 2FA"}
                </Button>
            </CardFooter>
        </Card>
    );
}