import {axiosWithToken} from "@/features";

export class SettingsService {

    private static readonly API_URL = '/settings';

    public static async agree(): Promise<void> {
        await axiosWithToken.post(this.API_URL + "/agree")
    }

    public static async enable2fa(): Promise<void> {
        await axiosWithToken.post(this.API_URL + "/2fa")
    }

    public static async deleteAccount(): Promise<void> {
        await axiosWithToken.delete(this.API_URL)
    }

    public static async setPassword(password: string): Promise<void> {
        await axiosWithToken.post(this.API_URL + "/password", {password, confirmedPassword: password})
    }
}
