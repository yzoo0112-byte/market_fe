import axios from "axios";

export const toggleLike = async (postId: number) => {
    const token = sessionStorage.getItem("jwt");
    return await axios.post(
        `/api/post/${postId}/like`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getLikeSummary = async (postId: number) => {
    const token = sessionStorage.getItem("jwt");
    return await axios.get(`/api/post/${postId}/like/summary`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

