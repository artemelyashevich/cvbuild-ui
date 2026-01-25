import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function SecurityForm() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => console.log("Security Data:", data);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Изменение пароля</CardTitle>
                    <CardDescription>Рекомендуется использовать сложный пароль.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Текущий пароль</Label>
                            <Input type="password" {...register("currentPassword")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Новый пароль</Label>
                            <Input type="password" {...register("newPassword")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Подтвердите пароль</Label>
                            <Input type="password" {...register("confirmPassword")} />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 flex justify-between">
                        <Button type="submit">Обновить пароль</Button>
                        <Button variant="link" size="sm" className="text-muted-foreground">Забыли пароль?</Button>
                    </CardFooter>
                </form>
            </Card>

            <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                    <CardTitle className="text-destructive font-bold">Опасная зона</CardTitle>
                    <CardDescription>Удаление аккаунта безвозвратно.</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="destructive" className="gap-2">
                        <Trash2 className="h-4 w-4" /> Удалить аккаунт
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}