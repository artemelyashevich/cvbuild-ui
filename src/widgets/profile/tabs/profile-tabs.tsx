import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUserStats } from "@/entities";
import { ResumeTabContent } from "./resume-tab-content";
import { UsageTabContent } from "./usage-tab-content";
import { SecurityTabContent } from "@/widgets/profile/tabs/security-tab-content";

interface Props {
    stats: IUserStats | undefined;
}

export function ProfileTabs({ stats }: Readonly<Props>) {
    return (
        <div className="md:col-span-2">
            <Tabs defaultValue="resumes" className="w-full space-y-8">

                <TabsList className="
                    grid grid-cols-3
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
                        value="activity"
                        className="rounded-[1.5rem] font-bold uppercase tracking-widest text-xs data-[state=active]:bg-white data-[state=active]:shadow-md"
                    >
                        Безопасность
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="resumes">
                    <ResumeTabContent updatedAt={stats?.updatedAt} />
                </TabsContent>

                <TabsContent value="usage">
                    <UsageTabContent usage={stats?.currentMonthUsage} />
                </TabsContent>

                <TabsContent value="activity">
                    <SecurityTabContent createdAt={stats?.createdAt} />
                </TabsContent>

            </Tabs>
        </div>
    );
}
