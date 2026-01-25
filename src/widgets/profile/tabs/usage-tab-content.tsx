import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { IUserStats } from "@/entities";
import {UsageStatItem} from "@/widgets/profile/tabs/usage-stat-card";

export const UsageTabContent = ({ usage }: { usage: IUserStats['currentMonthUsage'] }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" /> Текущий месяц
            </CardTitle>
            <CardDescription>
                Данные с {usage?.periodStart ? new Date(usage.periodStart).toLocaleDateString() : 'начала месяца'}
            </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <UsageStatItem label="Создано CV" value={usage?.resumeCreated || 0} />
            <UsageStatItem label="ИИ Запросы" value={usage?.aiRequests || 0} />
            <UsageStatItem label="Анализ вакансий" value={usage?.jobAnalyses || 0} />
        </CardContent>
    </Card>
);