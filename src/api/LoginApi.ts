
import axios from "axios";
import type { LoginUser, User } from "../type";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const getAuthToken = async (user: LoginUser) => {
  const response = await axios.post(`${BASE_URL}/login`, user);
  const token = response.headers.authorization;
  sessionStorage.setItem("jwt", token);
  console.log("응답 헤더 전체:", response.headers);
  console.log("저장된 토큰:", sessionStorage.getItem("jwt"));//확인용
  return response.data;
}

export const signUp = async (user: User): Promise<User> => {
  const res = await axios.post(`${BASE_URL}/signup`, user);
  return res.data;
}

export const checkDuplicateEmail = async (email: string): Promise<boolean> => {
  const res = await axios.get("/api/signup/echeck", { params: { email } });
  return res.data; // true면 중복됨, false면 사용 가능
};

export const checkDuplicateNickname = async (nickname: string): Promise<boolean> => {
  const res = await axios.get("/api/signup/ncheck", { params: { nickname } });
  return res.data;
};