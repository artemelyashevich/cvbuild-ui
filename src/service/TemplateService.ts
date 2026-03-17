import {axiosWithToken} from "@/features";

export class TemplateService {
    private static readonly API_URL = '/templates';

    public static async findAll(): Promise<any> {
        const response = await axiosWithToken.get(this.API_URL);
        return response.data.content;
    }

    public static async findByName(name: string): Promise<any> {
        const response = await axiosWithToken.get(this.API_URL + "/" + name);
        return response.data;
    }

    public static async create(data: any): Promise<any> {
        const response = await axiosWithToken.post(this.API_URL, data);
        return response.data;
    }
}