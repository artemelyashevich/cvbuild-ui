import {axiosDefault, axiosWithToken} from "@/features";
import {AuthRequest, AuthResponse} from "@/entities";
import Cookies from "js-cookie";
import {AxiosResponse} from "axios";

export class AuthService {

    private static readonly API_URL = '/auth';

    public static async register(auth: AuthRequest): Promise<AuthResponse> {
        const response = await AuthService.authenticate(auth, 'register')
        const {accessToken, refreshToken} = await response.data;
        Cookies.set("access_token", accessToken, {path: '/'});
        Cookies.set("refresh_token", refreshToken, {path: '/'});
        return {accessToken, refreshToken}
    }

    public static async login(auth: AuthRequest): Promise<AuthResponse> {
        const response = await AuthService.authenticate(auth, 'login')
        const {accessToken, refreshToken, secondPhaseEnabled} = await response.data;
        if (!secondPhaseEnabled) {
            Cookies.set("access_token", accessToken, {path: '/'});
            Cookies.set("refresh_token", refreshToken, {path: '/'});
        }
        return {accessToken, refreshToken, secondPhaseEnabled}
    }

    public static async logout(): Promise<void> {
        try {
            await axiosWithToken.post(AuthService.API_URL + '/logout')
        } finally {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            localStorage.removeItem('id');
        }
    }

    private static async authenticate(auth: AuthRequest, path: string): Promise<AxiosResponse> {
        return await axiosDefault.post(`${AuthService.API_URL}/${path}`, auth);
    }

    public static async refreshCode(email: string): Promise<void> {
        return await axiosDefault.post(`${AuthService.API_URL}/2fa/refresh`, {email: email});
    }

    public static async verify2fa(param: { email: string; code: string }) {
        const response = await axiosDefault.post(`${AuthService.API_URL}/2fa`, param);
        const {accessToken, refreshToken, secondPhaseEnabled} = await response.data;
        if (!secondPhaseEnabled) {
            Cookies.set("access_token", accessToken, {path: '/'});
            Cookies.set("refresh_token", refreshToken, {path: '/'});
        }
    }


}
