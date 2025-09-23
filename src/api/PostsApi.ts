import axios from 'axios';

type Posts = {
    id: number;
    userId: number;
    title: string;
    content: string;
    createAt: string;
    updateAt: string;
    views: number;
    hashtage: string;
}

export const getPostId = async (id: number): Promise<Posts> => {
    const response = await axios.get(`/api/post/${id}`)
    return response.data
}

export const deletePost = async (id: number): Promise<number> => {
    const response = await axios.delete(`/api/post/${id}`);
    return response.data
}