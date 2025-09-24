import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Badge, Box, Button, Container, Typography } from "@mui/material";
import { deletePost, getPostId } from "../api/PostsApi";

type Posts = {
    id: number;
    nickName: string;
    title: string;
    content: string;
    createAt: string;
    updateAt: string;
    views: number;
    hashtage: string;
    images?: string[];
}

export default function PostPage() {
    const [post, setPost] = useState<Posts | null>(null);
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getPostId(Number(id)).then(setPost).catch(console.error);
        }
    }, [id]);

    const handleDelete = async () => {
        if (!id) return

        const confirmDelete = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await deletePost(Number(id));
            alert("게시글이 삭제되었습니다.");
            window.location.href = "/";
        } catch (error) {
            alert("삭제 실패");
            console.error(error);
        }
    }


    return (
        <>
            {post ? (
                <Container maxWidth="md" sx={{ mt: 4 }}>

                    {/* 제목 */}
                    <Typography variant="h4" gutterBottom>{post.title}</Typography>


                    {/* 수정버튼 */}
                    {/* 삭제버튼 */}
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button variant="outlined">수정</Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleDelete} >삭제</Button>
                    </Box>

                    {/* 글번호 */}
                    {/* 작성자 */}
                    {/* 작성일(수정일) */}
                    {/* 조회수 */}
                    <Box sx={{ mt: 2, fontSize: 14, color: "gray" }}>
                        글번호: {post.id} | 작성자 : {post.nickName} | 작성일: {post.createAt} | 수정일: {post.updateAt} | 조회수: {post.views}
                    </Box>

                    {/* 해시태그 */}
                    <Badge color="primary" badgeContent={post.hashtage} />

                    {/* 첨부파일 */}
                    {/* 본문 이미지 */}
                    {post.images && post.images.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                            {post.images.map((src, idx) => (
                                <Box key={idx} sx={{ mb: 2 }}>
                                    <img src={src} alt={`본문 이미지 ${idx + 1}`} style={{ width: "100%", borderRadius: 8 }} />
                                </Box>
                            ))}
                        </Box>
                    )}

                    {/* 본문 */}
                    <Typography variant="body1" sx={{ mt: 3, whiteSpace: "pre-line" }}>
                        {post.content}
                    </Typography>

                    {/* 좋아요 */}
                    <Box sx={{ mt: 4 }}>
                        <Button>좋아요</Button>
                    </Box>
                </Container>
            ) : (
                <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="h6">게시물을 불러오는 중입니다...</Typography>
                </Container>
            )}


        </>
    )
}