import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  fetch("http://localhost:8080/manage/users", {
    headers: {
      Authorization: sessionStorage.getItem("jwt"),
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("서버 오류");
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) throw new Error("응답이 배열이 아님");
      setUsers(data);
    })
    .catch((err) => {
      console.error("회원 목록 불러오기 실패:", err);
      alert("회원 정보를 불러오는 중 오류가 발생했습니다.");
    });
}, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        회원 목록
      </Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>회원번호</TableCell>
              <TableCell>로그인 ID</TableCell>
              <TableCell>닉네임</TableCell>
              <TableCell>전화번호</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>주소</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.loginId}</TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.birth}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}