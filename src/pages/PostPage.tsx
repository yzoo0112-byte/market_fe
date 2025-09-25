import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Comment, Post } from "../type";
import { deletePost, getPostId } from "../api/postsApi";
import { createComment, getComment } from "../api/CommentApi";
import { useAuthStore } from "../store";
import type { ViewPost } from "../types";
import { getPostById } from "../api/TestApi";

export default function PostPage() {
    const { id } = useParams();
    const { userInfo, isAuthenticated } = useAuthStore();
    const [post, setPost] = useState<Post>({
        postId: 0,
        userId: 0,
        title: "",
        content: "",
        createAt: new Date(),
        updateAt: new Date(),
        views: 0,
        hashtag: "",
        fileList: []
    });

    //댓글 내용
    const [commentText, setCommentText] = useState("");
    //댓글 리스트
    const [comment, setComment] = useState<Comment[]>([]);

    const fetchPostData = async () => {
        try {
            const postResponse = await getPostId(Number(id));
            setPost(postResponse);

            const commentResponse = await getComment(Number(id));
            setComment(commentResponse);
        } catch (error) {
            console.error("데이터 로딩 실패", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchPostData();
        }
    }, [])

    const [viewpost, setViewPost] = useState<ViewPost | null>(null);

    //메인페이지 목록 리스트에서 클릭 시 해당 id에 관한 정보 백엔드에서 가져오기 
    useEffect(() => {
        if (!id) return;
        getPostById(Number(id)).then((data) => {
            setViewPost(data);
        });
    }, [id]);

    // 게시글 삭제
    const handleDelete = async () => {
        if (!id) return;

        const confirmDelete = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await deletePost(Number(id));
            alert("게시글이 삭제되었습니다.");
            window.location.href = "/"; // 홈으로 리디렉션
        } catch (error) {
            alert("삭제 실패");
            console.error(error);
        }

    }

    // 댓글 작성
    const handleSubmit = async () => {
        if (!commentText || !userInfo) return;

        const commentData: Comment = {
            postId: Number(id),
            comment: commentText,
            nickname: userInfo.nickname,
            createAt: new Date()
        };

        try {
            await createComment(commentData);
            setCommentText("");
            fetchPostData();
            alert("댓글이 성공적으로 등록되었습니다!");
        } catch (error) {
            alert("댓글 등록 실패");
            console.error(error);
        }
    };


    return (
        <>
            <Container maxWidth="sm">
                {/* 삭제버튼 */}
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="h4">{post.title}</Typography>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                    >
                        삭제
                    </Button>

                </Box>
                {/* <img src={`??`} alt="게시글 이미지" style={{ width: "100%" }} /> */}
                <Typography variant="body1" sx={{ marginY: 2 }}>{post.content}</Typography>
                <Typography variant="h6" sx={{ mt: 4 }}></Typography>
                {/* 댓글 입력 폼 */}

                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="댓글을 "
                        name="commetn"
                        variant="outlined"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        multiline
                        minRows={3}
                        required
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        등록
                    </Button>
                </Box>


                {/* 댓글 목록 표시 */}
                <Box sx={{ mt: 4 }}>
                    {comment.length > 0 ? (
                        comment.map((comment, index) => (
                            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {/* 댓글 작성자 표시. 백엔드에서 member 엔티티의 이름 등을 가져와야 합니다. */}
                                    {comment.nickname ? comment.nickname : "익명"}
                                </Typography>
                                <Typography variant="body1">
                                    {comment.comment}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
                        </Typography>
                    )}


                </Box>
            </Container>
        </>
    );
}