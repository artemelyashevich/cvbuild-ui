import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Briefcase} from "lucide-react";

export const SecurityTabContent = ({ createdAt }: { createdAt?: string }) => (
    <Card className={'p-4'}>
        <CardTitle>Параметры доступа</CardTitle>
        <CardDescription>Управляйте безопасностью вашей учетной записи</CardDescription>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-medium">Ваш аккаунт создан</p>
                        <p className="text-xs text-muted-foreground">
                            {createdAt ? new Date(createdAt).toLocaleDateString() : "—"}
                        </p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);