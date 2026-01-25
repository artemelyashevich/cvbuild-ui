'use client'

import {useAuth} from "@/features";
import {Separator} from "@/components/ui/separator";
import {Loader2} from "lucide-react";
import SettingContent from "@/widgets/settings/settings-content";

export default function SettingsPage() {
    const {user, loading} = useAuth();

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin"/></div>;

    return <div className="container max-w-4xl py-10 px-4 space-y-6">
        <header>
            <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
            <p className="text-muted-foreground">Управляйте своим аккаунтом.</p>
        </header>

        <Separator/>
        <SettingContent user={user}/>
    </div>
}