import axios from "axios";
import type { User } from "../type";
import instance from "./axiosConfig";

export const verifyPassword = async (password: string): Promise<boolean> => {
  const res = await instance.post("/mypage/pw", { password });
  return res.data.valid;
};



export const getUserInfo = async (): Promise<User> => {
  const res = await instance.get("/mypage/info");
  return res.data;
};

export const updateUserInfo = (data: Omit<User, "loginId">) => {
  return instance.put("/mypage/update", data);
};

export const deleteUserAccount = async (token: string): Promise<void> => {
  if (!token) throw new Error("로그인 토큰이 없습니다.");

  try {
    await axios.delete("/api/mypage/delete", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("회원탈퇴 요청 중 오류가 발생했습니다.");
  }
};

