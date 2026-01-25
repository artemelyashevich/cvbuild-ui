import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Download, Eye, FileText, Zap} from "lucide-react";
import {Progress} from "@/components/ui/progress";
import {JSX} from "react";
import {IUserStats} from "@/entities";

interface Props {
    stats: IUserStats | undefined,
}

export function LeftAside({stats}: Readonly<Props>): JSX.Element {
    const aiUsagePercent = stats ? Math.min((stats.aiRequestsUsed / 50) * 100, 100) : 0;
    return (
        <div className="space-y-6">
            {/* AI Usage Card */}
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-600"/> ИИ Запросы
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold mb-1">{stats?.aiRequestsUsed}</div>
                    <Progress value={aiUsagePercent} className="h-2"/>
                    <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider font-semibold">
                        Использовано в текущем периоде
                    </p>
                </CardContent>
            </Card>

            {/* Quick Stats Summary */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-medium">Общая статистика</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <FileText className="h-4 w-4"/> Резюме
                                </span>
                        <span className="font-bold">{stats?.resumesCreated || 0}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Eye className="h-4 w-4"/> Просмотры
                                </span>
                        <span className="font-bold">{stats?.totalViews || 0}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Download className="h-4 w-4"/> Загрузки
                                </span>
                        <span className="font-bold">{stats?.totalDownloads || 0}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}