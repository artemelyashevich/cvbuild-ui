import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {UserService} from "@/service/UserService";

function useUploadFile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ file, userId }: { file: File; userId: string }) =>
            UserService.uploadImage(file, userId),

        onMutate: () => {
            toast.loading("Загрузка изображения...", { id: "upload-image" });
        },

        onSuccess: () => {
            toast.success("Фото обновлено!", { id: "upload-image" });
            queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        },

        onError: (error: any) => {
            toast.error(error?.message || "Ошибка при загрузке фото", { id: "upload-image" });
        }
    });
}

export default useUploadFile;