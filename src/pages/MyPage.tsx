import { useState } from "react";
import type { User } from "../type";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { deleteUserAccount, getUserInfo, updateUserInfo, verifyPassword } from "../api/MyPageApi";
import { useNavigate } from "react-router-dom";


export default function MyPage() {
  const [step, setStep] = useState<"verify" | "view">("verify");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleVerify = () => {
    verifyPassword(password)
      .then((isValid: boolean) => {
        if (isValid) {
          getUserInfo().then((data: User) => {
            setUserInfo(data);
            setStep("view");
          });
        } else {
          alert("비밀번호가 틀렸습니다.");
        }
      })
      .catch(() => alert("확인 중 오류가 발생했습니다."));
  };

  //회원탈퇴
  const handleDeleteAccount = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
    navigate("/login");
    return;
  }

  const confirmed = window.confirm("회원정보가 영구 삭제됩니다. 삭제를 원하시면 확인을 눌러주세요.");
  if (!confirmed) return;

  try {
    await deleteUserAccount(token); // 백엔드 요청 성공
    alert("회원탈퇴가 완료되었습니다.");
    localStorage.removeItem("authToken"); // 로그아웃 처리
    navigate("/");
  } catch (error) {
    alert("회원탈퇴 중 오류가 발생했습니다.");
    console.error(error);
  }
};


  if (step === "verify") {
    return (
      <Stack spacing={2} mt={4} alignItems="center">
        <Typography variant="h5">마이페이지 접근을 위해 비밀번호를 입력해주세요</Typography>
        <TextField
          type="password"
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleVerify}>확인</Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} mt={4}>
      <Typography variant="h5">마이페이지</Typography>
      <TextField label="아이디" value={userInfo?.loginId} disabled />
      <TextField
        label="닉네임"
        value={userInfo?.nickname}
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev!, nickname: e.target.value }))
        }
      />
      <TextField
        label="이름"
        value={userInfo?.userName}
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev!, userName: e.target.value }))
        }
      />
      <TextField
        label="전화번호"
        value={userInfo?.phoneNum}
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev!, phoneNum: e.target.value }))
        }
      />
      <TextField
        label="생년월일"
        value={userInfo?.birth}
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev!, birth: e.target.value }))
        }
      />
      <TextField
        label="이메일"
        value={userInfo?.email}
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev!, email: e.target.value }))
        }
      />
      <TextField
        label="주소"
        value={userInfo?.addr}
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev!, addr: e.target.value }))
        }
      />

      {/* 다른 항목들도 동일하게 표시 및 수정 가능 */}
      <Button
        onClick={() => {
          updateUserInfo(userInfo!).then(() => alert("수정 완료"));
        }}
      >
        수정하기
      </Button>

            <Button color="error" onClick={handleDeleteAccount}>
        회원탈퇴
      </Button>
    </Stack>
  );
}