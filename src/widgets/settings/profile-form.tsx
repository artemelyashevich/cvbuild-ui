import {useForm} from "react-hook-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {AvatarUpload} from "./avatar-upload";
import {IProfile} from "@/entities";
import {Loader2} from "lucide-react";
import useUpdateProfile from "@/features/hooks/use-update-profile";
import {useState} from "react";
import useUploadFile from "@/features/hooks/use-upload-file";
import {useRouter} from "next/navigation";

export function ProfileForm({user}: Readonly<{ user: IProfile }>) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {mutate: updateProfile, isPending: isUpdatingProfile} = useUpdateProfile();
    const {mutate: uploadAvatar, isPending: isUploadingAvatar} = useUploadFile();

    const {register, handleSubmit} = useForm({
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
        }
    });

    const isPending = isUpdatingProfile || isUploadingAvatar;

    const {push} = useRouter()

    const onSubmit = async (data: { firstName: string; lastName: string, email: string }) => {
        updateProfile(data);

        if (selectedFile && user.id) {
            uploadAvatar({file: selectedFile, userId: user.id});
        }

        push("/profile");
    };

    const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Личная информация</CardTitle>
                <CardDescription>Ваше фото будет отображаться в генерируемых резюме.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-8">
                    <AvatarUpload
                        avatarUrl={user?.avatarUrl}
                        initials={initials}
                        onFileSelect={(file) => setSelectedFile(file)}
                    />

                    <Separator/>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Имя</Label>
                            <Input
                                id="firstName"
                                disabled={isPending}
                                {...register("firstName", {required: true})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Фамилия</Label>
                            <Input
                                id="lastName"
                                disabled={isPending}
                                {...register("lastName", {required: true})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Email</Label>
                            <Input
                                id="email"
                                disabled={isPending}
                                {...register("email", {required: true})}
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        {isPending ? "Сохранение..." : "Сохранить всё"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}