import { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material";

import type { TrashPost } from "../type";
import { getDeletedPosts, permanentlyDeletePost, restorePost } from "../api/TrashApi";



export default function TrashPage() {
    const [posts, setPosts] = useState<TrashPost[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTrash = async () => {
        setLoading(true);
        try {
            const res = await getDeletedPosts();
            setPosts(res.data);
        } catch (error) {
            console.error("휴지통 불러오기 실패:", error);
        } finally {
            setLoading(false);
        }

    };

    const handleRestore = async (postId: number) => {
        try {
            await restorePost(postId);
            fetchTrash();
        } catch (error) {
            console.error("복원 실패:", error);
            alert("복원에 실패했습니다.");
        }
    };


    const handlePermanentDelete = async (postId: number) => {
        if (!window.confirm("정말로 영구 삭제하시겠습니까?")) return;
        try {
            await permanentlyDeletePost(postId);
            fetchTrash();
        } catch (error) {
            console.error("영구 삭제 실패:", error);
            alert("영구 삭제에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchTrash();
    }, []);

    return (
        <Box p={4}>
            <Typography variant="h5" gutterBottom>휴지통</Typography>
            <Typography variant="subtitle1" gutterBottom>삭제내역</Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>글번호</TableCell>
                        <TableCell>글 제목</TableCell>
                        <TableCell>작성자명</TableCell>
                        <TableCell>작성일</TableCell>
                        <TableCell>복원</TableCell>
                        <TableCell>영구 삭제</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map(post => (
                        <TableRow key={post.postId}>
                            <TableCell>{post.postId}</TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{post.nickname}</TableCell>
                            <TableCell>{new Date(post.createAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="primary" onClick={() => handleRestore(post.postId)}>
                                    복원
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => handlePermanentDelete(post.postId)}>
                                    영구 삭제
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
