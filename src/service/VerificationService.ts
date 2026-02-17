import {axiosWithToken} from "@/features";

export class VerificationService {

    private static readonly API_URL = '/verification';

    public static async verifyRequest(email: string): Promise<void> {
        await axiosWithToken.post(VerificationService.API_URL, {email: email});
    }

    public static async checkOtp(otp: string): Promise<void> {
        await axiosWithToken.post(VerificationService.API_URL + "/check", {otp: otp});
    }
}
