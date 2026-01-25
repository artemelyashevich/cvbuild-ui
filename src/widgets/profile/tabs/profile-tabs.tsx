import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUserStats } from "@/entities";
import { ResumeTabContent } from "./resume-tab-content";
import { UsageTabContent } from "./usage-tab-content";
import {SecurityTabContent} from "@/widgets/profile/tabs/security-tab-content";

interface Props {
    stats: IUserStats | undefined;
}

export function ProfileTabs({ stats }: Readonly<Props>) {
    return (
        <div className="md:col-span-2">
            <Tabs defaultValue="resumes" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="resumes">Мои резюме</TabsTrigger>
                    <TabsTrigger value="usage">Активность</TabsTrigger>
                    <TabsTrigger value="activity">Безопасность</TabsTrigger>
                </TabsList>

                <TabsContent value="resumes" className="space-y-4">
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