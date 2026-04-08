import {IChat, PageRequestParams, PageResponse} from "@/entities";
import {axiosWithToken} from "@/features";

export class ResumeService {
    private static readonly BASE_URL = '/resumes';

    public static async findByCurrent(params: PageRequestParams, masked: boolean): Promise<PageResponse<IChat>> {
        const {data} = await axiosWithToken.get<PageResponse<IChat>>(this.BASE_URL, {
            params: {
                page: params.page ?? 0,
                size: params.size ?? 5,
                sort: params.sort ?? 'createdAt',
                direction: params.direction ?? 'desc',
                masked: masked
            },
        });
        return await data;
    }
}