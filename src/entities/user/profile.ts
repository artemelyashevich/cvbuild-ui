
export interface IProfile {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    login: string;
    emailVerified: boolean;
    secondAuthPhase?: boolean;
    createdAt: string;
    avatarUrl?: string;
}

export interface IUpdateProfile {
    firstName?: string;
    lastName?: string;
}