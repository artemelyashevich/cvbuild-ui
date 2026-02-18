'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "./profile-form";
import { SecurityForm } from "./security-form";
import { NotificationsTab } from "./notifications-form";
import { IProfile } from "@/entities";

interface Props {
    user: IProfile | undefined;
}

export default function SettingContent({ user }: Readonly<Props>) {
    return (
        <div className="w-full mx-auto p-6 space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Настройки профиля
            </h2>
            <p className="text-gray-600 text-sm">
                Управляйте личной информацией, безопасностью и уведомлениями в одном месте.
            </p>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid grid-cols-3 rounded-xl bg-gray-50 p-1">
                    <TabsTrigger
                        value="profile"
                        className="data-[state=active]:bg-[#D6FF00] data-[state=active]:shadow-md text-gray-700 font-medium"
                    >
                        Профиль
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="data-[state=active]:bg-[#D6FF00] data-[state=active]:shadow-md text-gray-700 font-medium"
                    >
                        Безопасность
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="data-[state=active]:bg-[#D6FF00] data-[state=active]:shadow-md text-gray-700 font-medium"
                    >
                        Уведомления
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    {user ? (
                        <ProfileForm user={user} />
                    ) : (
                        <p className="text-gray-500 text-center py-6">Загрузка данных профиля...</p>
                    )}
                </TabsContent>

                <TabsContent value="security">
                    <SecurityForm />
                </TabsContent>

                <TabsContent value="notifications">
                    <NotificationsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
