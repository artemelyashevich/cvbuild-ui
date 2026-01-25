import {IUserStats} from "@/entities";
import {axiosWithToken} from "@/features";

export class UserStatsService {
    private static readonly API_URL = '/user-stats';

    public static async getByUserId(userId: string): Promise<IUserStats> {
        const response = await axiosWithToken.get(this.API_URL + '/user/' + userId);
        return response.data
    }
}