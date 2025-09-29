import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
  Paper,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getManageSettings, type ManageSettings } from "../api/ManageFileApi";


export default function PostWrite() {
  const [title, setTitle] = useState("");
  const [hashtag, setHashtags] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const navigate = useNavigate();

  const convertBytesToReadableSize = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 ** 3)).toFixed(1)}GB`;
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 ** 2)).toFixed(1)}MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${bytes}B`;
  };


  const [managePolicy, setManagePolicy] = useState<ManageSettings>({
    fileExtension: '',
    fileMaxSize: 0,
    fileCount: 0,
  });


  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }



    // 정책 불러오기
    const fetchPolicy = async () => {
      try {
        const settings = await getManageSettings();
        setManagePolicy(settings);
      } catch (err) {
        console.error("파일 정책 불러오기 실패", err);
      }
    };

    fetchPolicy();
  }, [navigate]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const allowedExtensions = managePolicy.fileExtension
      .split(',')
      .map(ext => ext.trim().toLowerCase());

    const totalFiles = files.length + newFiles.length;

    // ✅ 파일 개수 제한
    if (totalFiles > managePolicy.fileCount) {
      alert(`최대 ${managePolicy.fileCount}개 파일만 업로드할 수 있습니다.`);
      return;
    }

    for (const file of newFiles) {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';

      // ✅ 확장자 제한
      if (!allowedExtensions.includes(ext)) {
        alert(`허용되지 않은 확장자입니다: ${ext}`);
        continue;
      }

      // ✅ 용량 제한
      if (file.size > managePolicy.fileMaxSize) {
        alert(`파일 용량 초과: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
        continue;
      }

      // ✅ 업로드 & 이미지 렌더링
      setFiles(prev => [...prev, file]);

      if (file.type.startsWith("image")) {
        const formData = new FormData();
        formData.append("files", file);

        try {
          const res = await fetch("http://localhost:8080/post/image", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `${sessionStorage.getItem("jwt")}`,
            },
          });

        } catch (error) {
          console.error("이미지 업로드 중 오류 발생:", error);
          alert("이미지 업로드 실패: 콘솔을 확인하세요.");
        }
      }
    }
  };


  const handleFileRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("hashtag", hashtag);
    formData.append("content", content);
    files.forEach((file) => formData.append("files", file));
    formData.append("userId", sessionStorage.getItem("userId")!);

    try {
      const res = await fetch("http://localhost:8080/post", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`,
        },
      });

      if (!res.ok) throw new Error("등록 실패");

      alert("게시글이 등록되었습니다.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("등록 중 오류가 발생했습니다.");
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
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Grid item xs={12}>
            <TextField
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="해시태그"
              value={hashtag}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="예: #프로젝트, #공지, #노션"
              fullWidth
              helperText="쉼표(,)로 구분하여 입력"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="본문 내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={8}
              fullWidth
            />
          </Grid>


          <Grid size={{ xs: 12 }}>
            <Box mb={1}>
              <strong>업로드 제한</strong>
              <Box fontSize="0.9rem" color="text.secondary">
                - 허용 확장자: {managePolicy.fileExtension || '-'}<br />
                - 최대 개수: {managePolicy.fileCount}개<br />
                - 최대 크기: {convertBytesToReadableSize(managePolicy.fileMaxSize)} / 파일당
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Button variant="outlined" component="label">
                파일 업로드
                <input type="file" multiple hidden onChange={handleFileChange} />
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

          <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              등록
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              취소
            </Button>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
