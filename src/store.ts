import { create } from "zustand";
import type { ComUserInfo } from "./type";


export type AuthStore = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

//로그인 상태만 확인
export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: !!sessionStorage.getItem("jwt"),
    login: () => set({ isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false }),

}));

//사용자 정보 확인
export const useUserStore = create<{
    userInfo: ComUserInfo;
    setUserInfo: (info: ComUserInfo) => void;
    clearUserInfo: () => void;
}>((set) => ({
    userInfo: {
        userId: 0,
        nickname: ""
    },
    setUserInfo: (info) => set({ userInfo: info }),
    clearUserInfo: () =>
        set({
            userInfo: {
                userId: 0,
                nickname: ""
            }
        })
}));


