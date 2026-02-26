import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {SettingsService} from "@/service/SettingsService";
import {AuthService} from "@/service/AuthService";
import {useRouter} from "next/navigation";

export default function DeleteAccountForm() {
    const {push} = useRouter();
    const handleSubmit = () => {
        SettingsService.deleteAccount();
        AuthService.logout()
        push("/auth");
    }
    return (
        <Card
            className="rounded-[2.5rem] shadow-xl border border-zinc-100 bg-zinc-50/50 p-8 hover:bg-white hover:border-black hover:shadow-xl transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-destructive font-bold">Опасная зона</CardTitle>
                <CardDescription>Удаление аккаунта безвозвратно.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button onClick={handleSubmit} variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4"/> Удалить аккаунт
                </Button>
            </CardFooter>
        </Card>
    )
}