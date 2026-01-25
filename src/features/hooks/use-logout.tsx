'use client'

import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/service/AuthService";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export function useLogout() {

    const {push} = useRouter();

    const {mutate, isPending} = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => AuthService.logout(),
        onSuccess: () => {
            toast.success('Successfully logged out!');
            push("/auth");
        }
    });

    return {
        mutate,
        isPending,
    };
}