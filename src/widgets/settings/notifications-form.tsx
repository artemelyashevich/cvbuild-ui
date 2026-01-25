import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function NotificationsTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Настройки рассылки</CardTitle>
                <CardDescription>
                    Выберите, какие уведомления вы хотите получать на почту.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

                <NotificationItem
                    title="Просмотры резюме"
                    description="Получать письмо, когда кто-то открывает ваше резюме по ссылке."
                    defaultChecked
                />

                <Separator />

                <NotificationItem
                    title="Новости сервиса"
                    description="Обновления ИИ-инструментов и новые шаблоны."
                />

                <Separator />

                <NotificationItem
                    title="Безопасность"
                    description="Уведомлять о входе с новых устройств."
                    defaultChecked
                    disabled
                />

            </CardContent>
        </Card>
    );
}

interface NotificationItemProps {
    title: string;
    description: string;
    defaultChecked?: boolean;
    disabled?: boolean;
}

function NotificationItem({
                              title,
                              description,
                              defaultChecked,
                              disabled
                          }: NotificationItemProps) {
    return (
        <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
                <Label className="text-base">{title}</Label>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
            <Switch
                defaultChecked={defaultChecked}
                disabled={disabled}
                onCheckedChange={(checked) => {
                    // Здесь будет логика API запроса в будущем
                    console.log(`${title}: ${checked}`);
                }}
            />
        </div>
    );
}