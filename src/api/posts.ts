import axios from 'axios';

export interface ViewPost {
  postId: number;
  title: string;
  nickname: string;
  views: number;
  create_at: string;
  update_at: string;
  contents?: string;
  hashtag?: string;
}

type SortKeyType = 'postId' | 'title' | 'nickname' | 'views' | 'create_at' | 'update_at';

interface ParamsType {
  page: number;
  size: number;
  sortKey: SortKeyType;
  sortOrder: 'asc' | 'desc';
  keyword?: string;
}

interface ApiResponse {
  data: ViewPost[];
  total: number;
}

export const getPosts = async (params: ParamsType): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>('/api/posts', { params });
  return response.data;
};
