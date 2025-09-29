import { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Stack } from "@mui/material";
import axios from "axios";
import { saveAs } from "file-saver";

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

 // 🔽 엑셀 다운로드
const handleDownloadExcel = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/post/manage/trash/excel", // 백엔드와 통일
      {
        responseType: "blob",
        headers: {
          Authorization: sessionStorage.getItem("jwt") || "",
        },
      }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "deleted_posts.xlsx");
  } catch (error) {
    console.error("엑셀 다운로드 실패:", error);
    alert("엑셀 다운로드에 실패했습니다.");
  }
};


    useEffect(() => {
        fetchTrash();
    }, []);

    return (
        <Box p={4}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                    <Typography variant="h5" gutterBottom>휴지통</Typography>
                    <Typography variant="subtitle1" gutterBottom>삭제내역</Typography>
                </Box>
                {/* 🔽 엑셀 다운로드 버튼 */}
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleDownloadExcel}
                >
                    엑셀 다운로드
                </Button>
            </Stack>

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
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleRestore(post.postId)}
                                >
                                    복원
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handlePermanentDelete(post.postId)}
                                >
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
