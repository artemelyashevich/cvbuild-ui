'use client'

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {LogOut, Settings} from "lucide-react";
import {IProfile} from "@/entities";
import {useLogout} from "@/features";
import {ImageService} from "@/service/ImageService";

interface Props {
    user: IProfile
}

export function ProfileHeader({user}: Readonly<Props>) {
    const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
    const { mutate: logout, isPending: logoutLoading } = useLogout()

    localStorage.setItem("id", user.id)

    return  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
                <AvatarImage src={ImageService.get(user.avatarUrl)} />
                <AvatarFallback className="text-xl bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <p className="text-muted-foreground">{user.email}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <Link href={'/profile/settings'}>
                <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" /> Настройки
                </Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={() => {logout()}}>
                <LogOut className="mr-2 h-4 w-4" /> {logoutLoading ? "Loading" : "Выйти" }
            </Button>
        </div>
    </div>
}