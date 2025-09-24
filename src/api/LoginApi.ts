
import type { LoginUser, User } from "../type";
import instance from "./axiosConfig";

export const getAuthToken = async (user: LoginUser) => {
  const response = await instance.post("/login", user);
  const rawToken = response.headers.authorization;
  const pureToken = rawToken.replace(/^Bearer\s/, "");// "Bearer " 접두어 제거

  localStorage.setItem("authToken", pureToken); // ✅ 순수 토큰 저장
  return pureToken; // ✅ 반환값도 순수 토큰으로
};


export const signUp = async (user: User): Promise<User> => {
  const res = await instance.post("/signup", user);
  return res.data;
};

export const checkDuplicateEmail = async (email: string): Promise<boolean> => {
  const res = await instance.get("/signup/echeck", {
    params: { email }
  });
  return res.data;
};

export const checkDuplicateNickname = async (nickname: string): Promise<boolean> => {
  const res = await instance.get("/signup/ncheck", {
    params: { nickname }
  });
  return res.data;
};