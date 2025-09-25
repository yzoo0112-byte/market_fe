import axios from "axios";
import type { ViewPost } from "../types";

export const getPostById = async (postId: number): Promise<ViewPost> => {
  const response = await axios.get<ViewPost>(`/api/post/${postId}`);
  return response.data;
};
