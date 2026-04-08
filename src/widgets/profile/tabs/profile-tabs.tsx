import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {IProfile, ISettings, IUserStats} from "@/entities";
import {ResumeTabContent} from "./resume-tab-content";
import {UsageTabContent} from "./usage-tab-content";
import {SecurityTabContent} from "@/widgets/profile/tabs/security-tab-content";
import {ChatHistoryTab} from "@/widgets/profile/tabs/chat-tab-content";
import SettingContent from "@/widgets/settings/settings-content";

interface Props {
    stats: IUserStats | undefined;
    user: IProfile | undefined;
    settings: ISettings | undefined;
}

export function ProfileTabs({stats, user, settings}: Readonly<Props>) {
    return (
        <div className="md:col-span-2">
            <Tabs defaultValue="resumes" className="w-full space-y-8">

                <TabsList className="
                    grid grid-cols-4
                    bg-zinc-100
                    rounded-[2rem]
                    p-1
                ">
                    <TabsTrigger
                        value="resumes"
                        className="rounded-[1.5rem] font-bold uppercase tracking-widest text-xs data-[state=active]:bg-white data-[state=active]:shadow-md"
                    >
                        Мои резюме
                    </TabsTrigger>

                    <TabsTrigger
                        value="usage"
                        className="rounded-[1.5rem] font-bold uppercase tracking-widest text-xs data-[state=active]:bg-white data-[state=active]:shadow-md"
                    >
                        Активность
                    </TabsTrigger>

                    <TabsTrigger
                        value="settings"
                        className="rounded-[1.5rem] font-bold uppercase tracking-widest text-xs data-[state=active]:bg-white data-[state=active]:shadow-md"
                    >
                        Настройки
                    </TabsTrigger>
                    <TabsTrigger
                        value="chats"
                        className="rounded-[1.5rem] font-bold uppercase tracking-widest text-xs data-[state=active]:bg-white data-[state=active]:shadow-md"
                    >
                        Чаты
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="resumes">
                    <ResumeTabContent updatedAt={stats?.updatedAt}/>
                </TabsContent>

                <TabsContent value="usage">
                    <UsageTabContent usage={stats?.currentMonthUsage}/>
                </TabsContent>

                <TabsContent value="settings">
                    <SettingContent user={user} settings={settings} stats = {stats} />
                </TabsContent>

                <TabsContent value={"chats"}>
                    <ChatHistoryTab/>
                </TabsContent>

            </Tabs>
        </div>
    );
}
