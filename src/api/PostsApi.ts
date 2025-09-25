import type { PostForm } from "../type";
import axios from "axios";



export async function createPost(post: PostForm): Promise<any> {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("hashtag", post.hashtag);
    formData.append("content", post.content);
    post.files.forEach((file) => {
        formData.append("files", file);
    });

    try {
        const response = await fetch("http://localhost:8080/api/post", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("서버 응답 실패");
        }

        return await response.json();
    } catch (error) {
        console.error("게시글 등록 오류:", error);
        throw error;
    }

}

// 게시글 상세 조회
export const getPostId = async (id: number) => {

    const response = await axios.get(`/api/post/${id}`
    );
    console.log(response.data)
    return response.data;

};


// 게시글 삭제
export const deletePost = async (id: number) => {

    const response = await axios.delete(`/api/post/${id}`

    );
    return response.data;
};

