import { create } from 'zustand';
import {IProfile} from "@/entities";

interface UserState {
    user: IProfile | null;
    setUser: (user: IProfile) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));