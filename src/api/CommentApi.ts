import axios from "axios";

export const updateComment = (commentId: number, userId: number, newContent: string) => {
    return axios.put(`/api/comment/${commentId}`, {
        userId,
        newContent,
    });
};

