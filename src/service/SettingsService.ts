import {axiosWithToken} from "@/features";
import {ISettings} from "@/entities";

export class SettingsService {

    private static readonly API_URL = '/settings';

    public static async findSettings(): Promise<ISettings> {
        const settings = await axiosWithToken.get(this.API_URL)
        return await settings.data
    }

    public static async agree(): Promise<boolean> {
        const response =await axiosWithToken.post(this.API_URL + "/agree")
        return await response.data
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
