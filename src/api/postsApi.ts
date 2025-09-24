import { PostForm } from "./type";

export async function createPost(post: PostForm): Promise<any> {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("hashtags", post.hashtags);
  formData.append("content", post.content);
  post.files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await fetch("http://localhost:8080/api/posts", {
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
