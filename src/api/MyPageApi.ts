import axios from "axios";
import type { User } from "../type";

export const verifyPassword = async (password: string): Promise<boolean> => {
  const token = localStorage.getItem("token");
  const res = await axios.post("/api/mypage/pw", { password }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.valid; // ✅ 여기서 boolean만 반환
};

export const getUserInfo = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/mypage/info", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // ✅ 여기서 User 객체만 반환
};

export const updateUserInfo = (data: Omit<User, "loginId">) => {
  return axios.put("/api/mypage/update", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
};