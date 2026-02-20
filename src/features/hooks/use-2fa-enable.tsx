import {useMutation} from "@tanstack/react-query";
import {SettingsService} from "@/service/SettingsService";

export default function useEnable2fa() {
    const {
        isPending,
        mutate,
        mutateAsync,
        error,
    } = useMutation({
        mutationKey: ["2fa-enable"],
        mutationFn: () => SettingsService.enable2fa(),
    });

    return {
        error,
        loading: isPending,
        mutate,
        mutateAsync
    };
}
