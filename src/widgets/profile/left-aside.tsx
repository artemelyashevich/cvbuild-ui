import { Card, CardContent } from "@/components/ui/card";
import { Download, Eye, FileText, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { JSX } from "react";
import { IUserStats } from "@/entities";

interface Props {
    stats: IUserStats | undefined,
}

export function LeftAside({ stats }: Readonly<Props>): JSX.Element {
    const aiUsagePercent = stats ? Math.min((stats.aiRequestsUsed / 50) * 100, 100) : 0;

    const items = [
        {
            title: "Резюме",
            value: stats?.resumesCreated ?? 0,
            icon: <FileText className="w-5 h-5" />
        },
        {
            title: "Просмотры",
            value: stats?.totalViews ?? 0,
            icon: <Eye className="w-5 h-5" />
        },
        {
            title: "Загрузки",
            value: stats?.totalDownloads ?? 0,
            icon: <Download className="w-5 h-5" />
        }
    ];

    return (
        <div className="space-y-6">

            {/* --- AI Usage Card --- */}
            <Card className="relative overflow-hidden border border-zinc-100 bg-zinc-50/50 shadow-sm rounded-[2.5rem] hover:bg-white hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">

                {/* Big Background Number */}
                <div className="absolute -right-6 -bottom-14 text-[8rem] font-black text-zinc-100 group-hover:text-zinc-50 transition-colors select-none pointer-events-none">
                    AI
                </div>

                <CardContent className="relative z-10 p-8 space-y-6">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-white shadow-sm group-hover:bg-[#D6FF00] group-hover:scale-110 transition-all duration-300">
                                <Zap className="w-5 h-5 text-black" />
                            </div>
                            <span className="uppercase tracking-widest text-xs font-bold text-zinc-500">
                                ИИ запросы
                            </span>
                        </div>

                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                            / 50
                        </span>
                    </div>

                    <div className="text-5xl font-black tracking-tight">
                        {stats?.aiRequestsUsed ?? 0}
                    </div>

                    <Progress
                        value={aiUsagePercent}
                        className="h-2 bg-zinc-200"
                    />
                </CardContent>
            </Card>


            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 gap-5">
                {items.map((item, index) => (
                    <Card
                        key={index}
                        className="relative overflow-hidden border border-zinc-100 bg-zinc-50/50 shadow-sm rounded-[2.5rem] hover:bg-white hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <div className="absolute -right-4 -bottom-10 text-[7rem] font-black text-zinc-100 group-hover:text-zinc-50 transition-colors select-none pointer-events-none leading-none">
                            0{index + 1}
                        </div>

                        <CardContent className="relative z-10 p-8 flex items-center justify-between">

                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-white shadow-sm group-hover:bg-[#D6FF00] group-hover:scale-110 transition-all duration-300">
                                    {item.icon}
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                                        {item.title}
                                    </p>
                                    <p className="text-3xl font-black tracking-tight">
                                        {item.value}
                                    </p>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                ))}
            </div>

        </div>
    );
}
