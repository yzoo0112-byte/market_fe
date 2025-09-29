import axios from "axios";

//휴wl통 호출
export const getDeletedPosts = () => {
    return axios.get("/api/post/d/trash", {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
    });
};

//복구
export const restorePost = (postId: number) => {
    return axios.patch(`/api/post/${postId}/restore`, {}, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
    });
};

//영구삭제
export const permanentlyDeletePost = (postId: number) => {
    return axios.delete(`/api/post/trash/${postId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
    });
};
