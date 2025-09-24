import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Container, Typography, Button, Paper, Table, TableHead, TableRow, TableCell,
    TableBody, IconButton, TextField
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { deletePost, getPostId } from "../api/postsApi";

type Attachment = {
    id: number;
    originalName: string;
    size: string;
    downloadCount: number;
    downloadUrl: string;
};

type Comment = {
    id: number;
    userId: number;
    author: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    likes: number;
    liked: boolean;
};


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
    attachments?: Attachment[];
};

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<Posts | null>(null);
    const [showAttachments, setShowAttachments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");


    useEffect(() => {
        if (id) {
            getPostId(Number(id))
                .then((data) => {
                    setPost(data);
                    setLikeCount(123); // 예시값
                    setComments([]);   // 댓글 API 연결 시 교체
                })
                .catch(console.error);
        }
    }, [id]);

    const handleDelete = async () => {
        if (!id) return;
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
    };

    const handleLikeToggle = () => {
        setLiked((prev) => !prev);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const newItem: Comment = {
            id: Date.now(),
            author: "현재유저", // 로그인 유저 이름
            content: newComment,
            createdAt: new Date().toISOString(),
            likes: 0,
            liked: false,
        };
        setComments((prev) => [...prev, newItem]);
        setNewComment("");
    };

    const handleCommentLike = (id: number) => {
        setComments((prev) =>
            prev.map((c) =>
                c.id === id
                    ? {
                        ...c,
                        liked: !c.liked,
                        likes: c.liked ? c.likes - 1 : c.likes + 1,
                    }
                    : c
            )
        );
    };

    const handleCommentEdit = (id: number, newContent: string) => {
        setComments((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, content: newContent, updatedAt: new Date().toISOString() } : c
            )
        );
    };

    return (
        <>
            {post ? (
                <div className="max-w-3xl mx-auto px-4 py-6">
                    {/* 제목, 작성자 정보 */}
                    <Typography variant="h4" className="font-bold">{post.title}</Typography>
                    <div className="text-sm text-gray-600 mt-2">
                        작성자: {post.nickName} · 작성일: {post.createAt} {post.updateAt && `(수정됨: ${post.updateAt})`} · 조회수: {post.views} · 좋아요: {likeCount}
                    </div>
                    <div className="flex justify-end mt-2">
                        <Button variant="outlined" onClick={() => setShowAttachments((prev) => !prev)}>첨부파일 보기</Button>
                        <Button variant="text" color="error" onClick={handleDelete}>삭제</Button>
                    </div>

                    {/* 첨부파일 테이블 */}
                    {showAttachments && post.attachments && (
                        <Paper className="my-4">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>파일명</TableCell>
                                        <TableCell>크기</TableCell>
                                        <TableCell>다운로드 횟수</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {post.attachments.map((file) => (
                                        <TableRow key={file.id} className="cursor-pointer hover:bg-gray-100" onClick={() => window.open(file.downloadUrl)}>
                                            <TableCell>{file.originalName}</TableCell>
                                            <TableCell>{file.size}</TableCell>
                                            <TableCell>{file.downloadCount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    )}

                    {/* 이미지 + 본문 */}
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-4 mb-4">
                            {post.images?.map((img, idx) => (
                                <img key={idx} src={img} alt={`image-${idx}`} className="max-w-full h-auto rounded shadow" />
                            ))}
                        </div>
                        <div className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</div>
                    </div>

                    {/* 좋아요 버튼 */}
                    <div className="flex items-center gap-2 mb-6">
                        <IconButton onClick={handleLikeToggle} color={liked ? "error" : "default"}>
                            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <span>{likeCount}</span>
                    </div>

                    {/* 댓글 입력 + 리스트 */}
                    <div className="mt-8">
                        <Typography variant="h6" className="mb-2">댓글</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="댓글을 입력하세요"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button variant="contained" className="mt-2" onClick={handleAddComment}>작성</Button>
                        {comments.map((comment) => (
                            <div key={comment.id} className="border p-3 rounded">
                                <div className="text-sm text-gray-500 mb-1">
                                    {comment.author} · {comment.createdAt} {comment.updatedAt && `(수정됨: ${comment.updatedAt})`}
                                </div>


                                <div className="flex items-center gap-2 mt-2">
                                    <IconButton onClick={() => handleCommentLike(comment.id)} color={comment.liked ? "error" : "default"}>
                                        {comment.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                    <span>{comment.likes}</span>
                                </div>
                            </div>
                        ))}

                        {comments.map((comment) => (
                            <div key={comment.id} className="border p-3 rounded">
                                <div className="text-sm text-gray-500 mb-1">
                                    {comment.author} · {comment.createdAt} {comment.updatedAt && `(수정됨: ${comment.updatedAt})`}
                                </div>

                                {/* 수정 버튼 조건부 렌더링 */}
                                {(currentUser.id === comment.userId || currentUser.role === 'ADMIN') && (
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            setEditingCommentId(comment.id);
                                            setEditContent(comment.content);
                                        }}
                                    >
                                        수정
                                    </Button>
                                )}

                                {/* 수정 중일 때만 수정 폼 보여주기 */}
                                {editingCommentId === comment.id ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            multiline
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                        />
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={async () => {
                                                try {
                                                    await updateComment(comment.id, currentUser.id, editContent); // 서버 반영
                                                    setComments((prev) =>
                                                        prev.map((c) =>
                                                            c.id === comment.id
                                                                ? { ...c, content: editContent, updatedAt: new Date().toISOString() }
                                                                : c
                                                        )
                                                    );
                                                    setEditingCommentId(null); // 수정 모드 종료
                                                } catch (error) {
                                                    console.error("댓글 수정 실패", error);
                                                    alert("댓글 수정에 실패했습니다.");
                                                }
                                            }}
                                        >
                                            저장
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() => setEditingCommentId(null)}
                                        >
                                            취소
                                        </Button>
                                    </>
                                ) : (
                                    <TextField
                                        fullWidth
                                        multiline
                                        value={comment.content}
                                        disabled
                                    />
                                )}

                                <div className="flex items-center gap-2 mt-2">
                                    <IconButton onClick={() => handleCommentLike(comment.id)} color={comment.liked ? "error" : "default"}>
                                        {comment.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                    <span>{comment.likes}</span>
                                </div>
                            </div>
                        ))}



                        <div className="mt-4 space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="border p-3 rounded">
                                    <div className="text-sm text-gray-500 mb-1">
                                        {comment.author} · {comment.createdAt} {comment.updatedAt && `(수정됨: ${comment.updatedAt})`}
                                    </div>
                                    <TextField
                                        fullWidth
                                        multiline
                                        value={comment.content}
                                        onChange={(e) => handleCommentEdit(comment.id, e.target.value)}
                                    />
                                    <div className="flex items-center gap-2 mt-2">
                                        <IconButton onClick={() => handleCommentLike(comment.id)} color={comment.liked ? "error" : "default"}>
                                            {comment.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                        <span>{comment.likes}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
                    <Typography variant="h6">게시글이 존재하지 않습니다.</Typography>
                </Container>
            )}
        </>
    );
}