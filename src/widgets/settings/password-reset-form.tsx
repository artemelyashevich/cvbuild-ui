import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useForm} from "react-hook-form";

export default function PasswordResetForm() {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data: any) => console.log("Security Data:", data);
    return (
        <Card
            className="rounded-[2.5rem] shadow-xl border border-zinc-100 bg-zinc-50/50 p-8 hover:bg-white hover:border-black hover:shadow-xl transition-all duration-300">
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
                    <Button
                        className="hover:text-white w-full h-14 rounded-[2rem] bg-[#D6FF00] text-black font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
                        type="submit">Обновить пароль</Button>
                </CardFooter>
            </form>
        </Card>
    )
}