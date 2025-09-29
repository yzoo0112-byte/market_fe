import { useState } from "react";
import type { User } from "../type";
import { Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { deleteUserAccount, getUserInfo, updateUserInfo, verifyPassword } from "../api/MyPageApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { checkDuplicateEmail, checkDuplicateNickname, checkDuplicatePhone } from "../api/LoginApi";


export default function MyPage() {
  const [step, setStep] = useState<"verify" | "view">("verify");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const {logout} = useAuthStore();
  const navigate = useNavigate();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [emailCheck, setEmailCheck] = useState<null | boolean>(null);
  const [nicknameCheck, setNicknameCheck] = useState<null | boolean>(null);

  const showToast = (message: string) => {
  setToastMessage(message);
  setToastOpen(true);
};

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
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      navigate("/login");
      return;
    }

    const confirmed = window.confirm("회원정보가 영구 삭제됩니다. 삭제를 원하시면 확인을 눌러주세요.");
    if (!confirmed) return;

    try {
      await deleteUserAccount(); // 백엔드 요청 성공
      alert("회원탈퇴가 완료되었습니다.");
      logout(); // 로그아웃 처리
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

  const handleUpdateUserInfo = async () => {
    if (!userInfo) return;

    try {
      const phoneExists = await checkDuplicatePhone(userInfo.phoneNum);

      if (phoneExists) {
        showToast("이미 가입한 전화번호입니다.");
        return;
      }

      await updateUserInfo(userInfo);
      showToast("회원정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      showToast("회원정보 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCheckEmail = () => {
    if (!userInfo?.email) {
      showToast("이메일을 입력해주세요.");
      return;
    }
    checkDuplicateEmail(userInfo.email).then((exists) => {
      setEmailCheck(exists);
      showToast(exists ? "이미 존재하는 이메일입니다." : "사용 가능한 이메일입니다.");
    });
  };

  const handleCheckNickname = () => {
    if (!userInfo?.nickname) {
      showToast("닉네임을 입력해주세요.");
      return;
    }
    checkDuplicateNickname(userInfo.nickname).then((exists) => {
      setNicknameCheck(exists);
      showToast(exists ? "이미 존재하는 닉네임입니다." : "사용 가능한 닉네임입니다.");
    });
  };

 

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
      <Button onClick={handleCheckNickname}>중복 확인</Button>
      {nicknameCheck === true && <span style={{ color: "red" }}>이미 존재하는 닉네임입니다</span>}
      {nicknameCheck === false && <span style={{ color: "green" }}>사용 가능한 닉네임입니다</span>}
      <TextField
        label="이메일"
        value={userInfo?.email}
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev!, email: e.target.value }))
        }
      />
      <Button onClick={handleCheckEmail}>중복 확인</Button>
            {emailCheck === true && <span style={{ color: "red" }}>이미 존재하는 이메일입니다</span>}
            {emailCheck === false && <span style={{ color: "green" }}>사용 가능한 이메일입니다</span>}
      
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
        label="주소"
        value={userInfo?.addr}
        onChange={(e) =>
          setUserInfo((prev) => ({ ...prev!, addr: e.target.value }))
        }
      />
      <Button onClick={handleUpdateUserInfo}>수정하기</Button>
            <Button color="error" onClick={handleDeleteAccount}>
        회원탈퇴
      </Button>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
      />
    </Stack>
  );
}