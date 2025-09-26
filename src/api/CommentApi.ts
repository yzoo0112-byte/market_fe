import axios from "axios";
import type { Comment } from "../type";

//댓글 수정
export const updateComment = async (CommentData: Comment): Promise<Comment> => {
    return axios.patch(`/api/post/${CommentData.postId}comment/${CommentData.commentId}`, CommentData);
};

//댓글 조회
export const getComment = async (postId: number): Promise<Comment[]> => {
    const response = await axios
        .get(`/api/post/${postId}/comment`);
    return response.data;
};

//댓글 작성
export const createComment = async (CommentData: Comment): Promise<void> => {
    return await axios.post(`/api/post/${CommentData.postId}/comment`, {
        comment: CommentData.comment,
        userId: CommentData.userId, // 세션스토리지에서 꺼낸 값
    });

}

