export class ImageService {
    private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888/api/v1/images/';

    public static get(avatarUrl: string | undefined): string {
        if (!avatarUrl) return "";
        return `${this.BASE_URL}${avatarUrl}`;
    }
}