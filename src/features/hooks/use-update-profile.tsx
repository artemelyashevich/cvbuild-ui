'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/service/UserService";
import { IUpdateProfile } from "@/entities";
import { toast } from "sonner";

function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IUpdateProfile) => UserService.update(data),

        onMutate: () => {
            toast.loading("Сохранение изменений...", { id: "update-profile" });
        },

        onSuccess: (updatedData) => {
            toast.success("Профиль обновлен!", { id: "update-profile" });

            queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        },

        onError: (error: any) => {
            toast.error(error?.message || "Ошибка при сохранении", { id: "update-profile" });
        }
    });
}

export default useUpdateProfile;