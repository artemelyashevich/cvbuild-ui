import {axiosWithToken} from "@/features";

export class SettingsService {

    private static readonly API_URL = '/settings';

    public static async agree(): Promise<void> {
        await axiosWithToken.post(this.API_URL + "/agree")
    }

    public static async enable2fa(): Promise<void> {
        await axiosWithToken.post(this.API_URL + "/2fa")
    }
}
