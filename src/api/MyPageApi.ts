import type { User } from "../type";
import instance from "./axiosConfig";

export const verifyPassword = async (password: string): Promise<boolean> => {
  const res = await instance.post("/mypage/pw", { password });
  return res.data.valid;
};



export const getUserInfo = async (): Promise<User> => {
  const res = await instance.get("/api/mypage/info");
  return res.data;
};

export const updateUserInfo = (data: Omit<User, "loginId">) => {
  return instance.put("/api/mypage/update", data);
};