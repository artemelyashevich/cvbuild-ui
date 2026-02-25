import {axiosWithToken} from "@/features";
import {IChat, PageRequestParams, PageResponse } from "@/entities";

export class ChatService {
    private static readonly BASE_URL = '/ai-chat/';

    public static async findByCurrent(params: PageRequestParams): Promise<PageResponse<IChat>> {
        const {data} = await axiosWithToken.get<PageResponse<IChat>>('/ai-chat', {
            params: {
                page: params.page ?? 0,
                size: params.size ?? 5,
                sort: params.sort ?? 'createdAt',
                direction: params.direction ?? 'desc',
            },
        });
        return data;
    }

    public static async findChat(chatId: string): Promise<IChat> {
        const response = await axiosWithToken.get(this.BASE_URL + "chat/" + chatId)
        return response.data
    }

    public static async createChat(): Promise<IChat> {
        const response = await axiosWithToken.post(this.BASE_URL + "create")
        return response.data
    }

    public static async generateOrFindResumeByChatId(chatId: string): Promise<any> {
        const response = await axiosWithToken.get(this.BASE_URL + "resume/" + chatId)
        return response.data
    }
}