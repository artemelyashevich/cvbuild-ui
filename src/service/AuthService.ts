import {axiosDefault, axiosWithToken} from "@/features";
import {AuthRequest} from "@/entities";
import Cookies from "js-cookie";
import {AxiosResponse} from "axios";

export class AuthService {

    private static readonly API_URL = '/auth';

    public static async register(auth: AuthRequest): Promise<void> {
       await AuthService.authenticate(auth, 'register')
    }

    public static async login(auth: AuthRequest): Promise<void> {
        await AuthService.authenticate(auth, 'login')
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

    private static async authenticate(auth: AuthRequest, path: string): Promise<void> {
        const response: AxiosResponse = await axiosDefault.post(`${AuthService.API_URL}/${path}`, auth);
        const {accessToken, refreshToken} = response.data;
        Cookies.set("access_token", accessToken, {path: '/'});
        Cookies.set("refresh_token", refreshToken, {path: '/'});
    }
}
