import {axiosWithToken} from "@/features";
import {IChat} from "@/entities";

export class ChatService {
    private static readonly BASE_URL = '/ai-chat/';

    public static async findAllChats(): Promise<IChat[]> {
        const response = await axiosWithToken.get(this.BASE_URL)
        return response.data;
    }

    public static async findChat(chatId: string): Promise<IChat> {
        const response = await axiosWithToken.get(chatId)
        return response.data
    }

    public static async createChat(): Promise<IChat> {
        const response = await axiosWithToken.post(this.BASE_URL + "create")
        return response.data
    }
}