import {axiosWithToken} from "@/features";
import {IProfile, IUpdateProfile} from "@/entities";

export class UserService {
    private static readonly API_URL = '/user-profile';

    public static async getCurrent(): Promise<IProfile> {
        console.log("Attempting to get current profile");
        const response = await axiosWithToken.get(this.API_URL + '/current');
        return response.data;
    }

    public static async update(profile: IUpdateProfile): Promise<IProfile> {
        console.log("Attempting to update profile");
        const response = await axiosWithToken.patch(this.API_URL, profile);
        return response.data;
    }

    public static async uploadImage(file: File, userId: string): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axiosWithToken.post(this.API_URL + `/avatar/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
}