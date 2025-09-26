import { create } from "zustand";
import type { ComUserInfo } from "./type";


export type AuthStore = {
    isAuthenticated: boolean;
    userInfo: ComUserInfo;
    login: (user: ComUserInfo) => void;
    logout: () => void;
}


export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: !!sessionStorage.getItem("jwt"),
    userInfo: {
        userId: Number(sessionStorage.getItem("userId")),
        nickname: sessionStorage.getItem("nickname") ?? "",
    },
    login: (user: ComUserInfo) => {
        set({ isAuthenticated: true, userInfo: user })
        console.log("?", user);
    },
    logout: () => {
        sessionStorage.removeItem("jwt");
        set({
            isAuthenticated: false, userInfo: {
                userId: 0,
                nickname: ""
            }
        });
    }
}));