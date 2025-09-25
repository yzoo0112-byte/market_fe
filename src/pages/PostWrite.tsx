// import { useState } from "react";

// export default function PostWrite() {
//   const [title, setTitle] = useState("");
//   const [hashtags, setHashtags] = useState("");
//   const [content, setContent] = useState("");
//   const [files, setFiles] = useState<File[]>([]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles([...files, ...Array.from(e.target.files)]);
//     }
//   };

//   const handleSave = async() => {
//     const formData = new FormData();
//     formData.append("title", title)
//     formData.append("hashtags", hashtags)
//     formData.append("content", content)
//     files.forEach((files) => {
//       formData.append("files", files);
//     });

//     try {
//       const res = await fetch("http://localhost:8080/posts", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       console.log("서버 응답:", data);
//       alert("게시글이 등록되었습니다.");
//     } catch (err) {
//       console.error("에러 발생:", err);
//       alert("저장 중 오류가 발생했습니다.");
//     }
//   };

//   const handleCancel = () => {
//     if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
//       setTitle("");
//       setHashtags("");
//       setContent("");
//       setFiles([]);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* 상단바 */}
//       <header className="w-full bg-white shadow px-8 py-4 flex justify-between items-center">
//         <div className="text-2xl font-bold text-blue-600">로고</div>
//         <input
//           type="text"
//           placeholder="검색어를 입력하세요"
//           className="w-1/3 p-2 border rounded focus:ring focus:ring-blue-300"
//         />
//         <button className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//           로그인/로그아웃
//         </button>
//       </header>

//       {/* 본문 */}
//       <main className="flex-1 flex justify-center items-start p-10">
//         <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
//           {/* 제목 */}
//           <div className="mb-6">
//             <label className="block text-lg font-semibold mb-2">제목</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="게시글 제목을 입력하세요"
//               className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* 해시태그 */}
//           <div className="mb-6">
//             <label className="block text-lg font-semibold mb-2">해시태그</label>
//             <input
//               type="text"
//               value={hashtags}
//               onChange={(e) => setHashtags(e.target.value)}
//               placeholder="예: #프로젝트, #공지, #노션"
//               className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
//             />
//             <p className="text-sm text-gray-500 mt-1">쉼표(,)로 구분하여 입력</p>
//           </div>

//           {/* 본문 */}
//           <div className="mb-6">
//             <label className="block text-lg font-semibold mb-2">본문 내용</label>
//             <textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="게시글 내용을 입력하세요"
//               className="w-full p-4 border rounded h-60 focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* 첨부파일 */}
//           <div className="mb-6">
//             <label className="block text-lg font-semibold mb-2">첨부파일</label>
//             <input
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               className="w-full"
//             />
//             <ul className="mt-3 space-y-1 text-sm text-gray-700">
//               {files.map((file, idx) => (
//                 <li key={idx} className="border-b pb-1">
//                   {file.name}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* 버튼 */}
//           <div className="flex justify-end space-x-4">
//             <button
//               onClick={handleSave}
//               className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               등록
//             </button>
//             <button
//               onClick={handleCancel}
//               className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//             >
//               취소
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState, } from "react";
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

export default function PostWrite() {
  

  const [title, setTitle] = useState("");
  const [hashtag, setHashtags] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

useEffect(() => {
  const token = sessionStorage.getItem("jwt");
  if (!token) {
    alert("로그인이 필요합니다.");
    navigate("/login");
  }
}, []);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("hashtag", hashtag);
    formData.append("content", content);
    files.forEach((file) => {
      formData.append("files", file);
      formData.append("userId", sessionStorage.getItem("userId")!);

    });

    try {
      const res = await fetch("http://localhost:8080/post", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`, // JWT 토큰 포함
        },
      });

      if (!res.ok) throw new Error("서버 오류");

      const data = await res.json();
      console.log("서버 응답:", data);
      alert("게시글이 등록되었습니다.");
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
                value={hashtag}
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
                      <IconButton
                        edge="end"
                        onClick={() =>
                          setFiles(files.filter((_, i) => i !== idx))
                        }
                      >
                        {/* 삭제 아이콘 */}
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