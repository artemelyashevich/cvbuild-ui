'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IProfile } from "@/entities";
import { User, Settings, LogOut, Sun, Moon, ArrowRight } from "lucide-react";
import { ImageService } from "@/service/ImageService";
import { AuthService } from "@/service/AuthService";

interface HeaderProps {
    user?: IProfile;
}

export function LayoutHeader({ user }: Readonly<HeaderProps>) {
    const pathname = usePathname();
    const isLoggedIn = Boolean(user?.id);

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    const handleLogout = () => {
        AuthService.logout();
        window.location.href = "/auth";
    };

    const renderUserMenu = () => (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-10 w-10 border-2 border-yellow-400 cursor-pointer">
                    <AvatarImage src={ImageService.get(user?.avatarUrl)} />
                    <AvatarFallback>{`${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <DropdownMenuItem asChild>
                    <Link href="/profile"><User className="mr-2 h-4 w-4" /> Профиль</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/profile/settings"><Settings className="mr-2 h-4 w-4" /> Настройки</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Выйти
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-6">
            <div
                className="w-full max-w-7xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-zinc-200 dark:border-gray-700 rounded-[2rem] h-16 flex items-center justify-between px-6"
            >
                <Link href="/" className="font-black text-lg tracking-tight text-black dark:text-white">
                    CV<span className="text-[#D6FF00]">AI</span>
                </Link>

                {!pathname?.includes("/builder") && !pathname?.includes("/profile") && (
                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                        <Link href="#how" className="hover:text-black dark:hover:text-white transition-colors">
                            Как это работает
                        </Link>
                        <Link href="#pricing" className="fhover:text-black dark:hover:text-white transition-colors">
                            Тарифы
                        </Link>
                        {!isLoggedIn ? (
                            <Link href="/auth" className="hover:text-black dark:hover:text-white transition-colors">
                                Войти
                            </Link>
                        ) : (
                            <Link href="/profile" className="hover:text-black dark:hover:text-white transition-colors">
                                Профиль
                            </Link>
                        )}
                    </nav>
                )}

                <div className="flex items-center gap-4">
                    {user && renderUserMenu()}

                    <Button
                        variant="outline"
                        size="sm"
                        className="p-2 rounded-full"
                        onClick={() => setIsDark(!isDark)}
                    >
                        {isDark ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-gray-700" />}
                    </Button>

                    {!pathname?.includes("/builder") && !pathname?.includes("/profile") && (
                        <Link
                            href="/builder/stage/welcome"
                            className="bg-[#D6FF00] text-black px-6 h-10 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:brightness-105 transition-all"
                        >
                            Начать
                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
