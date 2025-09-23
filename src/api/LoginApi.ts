import axios from "axios";
import type { LoginUser, User } from "../type";



const BASE_URL = import.meta.env.VITE_API_URL;


export const getAuthToken = async (user: LoginUser) => {
    const response = await axios.post(`${BASE_URL}/login`, user);
    return response.headers.authorization;
}

export const signUp = async (user: User): Promise<User> => {
    const res = await axios.post(`${BASE_URL}/signup`, user);
    return res.data;
}