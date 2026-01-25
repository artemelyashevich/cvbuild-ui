import { useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, User, X } from "lucide-react";
import { toast } from "sonner";
import {ImageService} from "@/service/ImageService";

interface Props {
    initials: string;
    onFileSelect: (file: File | null) => void;
    avatarUrl: string;
}

export function AvatarUpload({ initials, onFileSelect, avatarUrl }: Readonly<Props>) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Файл слишком большой. Максимум 10MB");
                return;
            }

            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            onFileSelect(file);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onFileSelect(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="flex flex-col items-center sm:flex-row gap-6">
            <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-muted group-hover:opacity-80 transition-all">
                    <AvatarImage src={ImageService.get(avatarUrl)} />
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                        {initials || <User size={40} />}
                    </AvatarFallback>
                </Avatar>

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full"
                >
                    <Camera className="text-white h-6 w-6" />
                </button>

                {preview && (
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-1 shadow-sm hover:bg-destructive/90 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                )}
            </div>

            <div className="space-y-2 text-center sm:text-left">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Сменить фото
                </Button>
                <p className="text-xs text-muted-foreground">
                    JPG, PNG или GIF. Максимум 10MB.
                </p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
            </div>
        </div>
    );
}