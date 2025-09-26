import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Paper,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function PostEdit() {
  const { id } = useParams(); // 게시글 ID
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [hashtag, setHashtags] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  // 로그인 확인 및 기존 게시글 불러오기
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // 게시글 데이터 불러오기
    fetch(`http://localhost:8080/post/${id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setHashtags(data.hashtag);
        setContent(data.content);
        // 기존 파일은 서버 URL로 관리되므로 별도 처리 필요 (예: 미리보기)
      })
      .catch((err) => {
        console.error(err);
        alert("게시글 정보를 불러오는 중 오류가 발생했습니다.");
      });
  }, [id, navigate]);

  // 파일 추가
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  // 파일 삭제
  const handleFileRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // 게시글 수정 요청
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("hashtag", hashtag);
    formData.append("content", content);
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("userId", sessionStorage.getItem("userId")!);

    try {
      const res = await fetch(`http://localhost:8080/post/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`,
        },
      });

      if (!res.ok) throw new Error("수정 실패");

      alert("게시글이 수정되었습니다.");
      navigate("/"); // 메인 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  // 수정 취소
  const handleCancel = () => {
    if (window.confirm("수정을 취소하시겠습니까?")) {
      navigate("/");
    }
  };

  return (
    <Box>
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                label="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="해시태그"
                value={hashtag}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="예: #프로젝트, #공지, #노션"
                fullWidth
                variant="outlined"
                helperText="쉼표(,)로 구분하여 입력"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="본문 내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={8}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2}>
                <Button variant="outlined" component="label">
                  파일 업로드
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Box>
              <List dense>
                {files.map((file, idx) => (
                  <ListItem
                    key={idx}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => handleFileRemove(idx)}>
                        <CloseIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={file.name} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                수정
              </Button>
              <Button variant="outlined" color="inherit" onClick={handleCancel}>
                취소
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}