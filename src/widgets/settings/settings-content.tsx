'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "./profile-form";
import { SecurityForm } from "./security-form";
import {NotificationsTab} from "./notifications-form";
import {IProfile} from "@/entities";

interface Props {
    user: IProfile | undefined
}

export default function SettingContent({user}: Readonly<Props>) {
    return (
            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="profile">Профиль</TabsTrigger>
                    <TabsTrigger value="security">Безопасность</TabsTrigger>
                    <TabsTrigger value="notifications">Уведомления</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileForm user={user} />
                </TabsContent>

                <TabsContent value="security">
                    <SecurityForm />
                </TabsContent>

                <TabsContent value="notifications">
                    <NotificationsTab />
                </TabsContent>
            </Tabs>
    );
}