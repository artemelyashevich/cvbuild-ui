import {Card} from "@/components/ui/card";
import {Briefcase} from "lucide-react";

export const SecurityTabContent = ({createdAt}: { createdAt?: string }) => {
    return (
        <Card className="
        border border-zinc-100
        bg-zinc-50/50
        rounded-[2.5rem]
        p-8
        hover:bg-white
        hover:shadow-xl
        transition-all
    ">
            <div className="space-y-6">
                <div>
                    <h3 className="text-3xl font-black tracking-tight">
                        Параметры доступа
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">
                        Управляйте безопасностью вашей учетной записи
                    </p>
                </div>

                <div className="flex items-center justify-between p-4 border border-zinc-200 rounded-2xl bg-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-zinc-100">
                            <Briefcase className="w-4 h-4"/>
                        </div>

                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest">
                                Аккаунт создан
                            </p>
                            <p className="text-xs text-zinc-500 mt-1">
                                {createdAt ? new Date(createdAt).toLocaleDateString() : "—"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    )
}
