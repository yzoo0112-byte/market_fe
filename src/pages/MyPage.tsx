import { useState } from "react";
import type { User } from "../type";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { getUserInfo, updateUserInfo, verifyPassword } from "../api/MyPageApi";

export default function MyPage() {
  const [step, setStep] = useState<"verify" | "view">("verify");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState<User | null>(null);

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
      {/* 다른 항목들도 동일하게 표시 및 수정 가능 */}
      <Button
        onClick={() => {
          updateUserInfo(userInfo!).then(() => alert("수정 완료"));
        }}
      >
        수정하기
      </Button>
    </Stack>
  );
}