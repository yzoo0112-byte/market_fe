
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
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
import { useNavigate } from "react-router-dom";

export default function PostWrite() {
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("hashtags", hashtags);
    formData.append("content", content);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch("http://localhost:8080/posts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("서버 응답:", data);
      alert("게시글이 등록되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("에러 발생:", err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
      setTitle("");
      setHashtags("");
      setContent("");
      setFiles([]);
    }
  };

  return (
    <Box>
      {/* 상단바 */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            로고
          </Typography>
          <TextField
            placeholder="검색어를 입력하세요"
            size="small"
            sx={{ width: "40%" }}
          />
          <Button variant="contained" color="primary">
            로그인/로그아웃
          </Button>
        </Toolbar>
      </AppBar>

      {/* 본문 */}
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
          <Grid container spacing={4}>
            {/* 제목 */}
            <Grid item xs={12}>
              <TextField
                label="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* 해시태그 */}
            <Grid item xs={12}>
              <TextField
                label="해시태그"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="예: #프로젝트, #공지, #노션"
                fullWidth
                variant="outlined"
                helperText="쉼표(,)로 구분하여 입력"
              />
            </Grid>

            {/* 본문 */}
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

            {/* 첨부파일 */}
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  variant="outlined"
                  component="label"
                  // startIcon={<UploadFile />}
                >
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
                      <IconButton
                        edge="end"
                        onClick={() =>
                          setFiles(files.filter((_, i) => i !== idx))
                        }
                      >
                        {/* <Cancel color="error" /> */}
                      </IconButton>
                    }
                  >
                    <ListItemText primary={file.name} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* 버튼 */}
            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ px: 4 }}
              >
                등록
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleCancel}
                sx={{ px: 4 }}
              >
                취소
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
