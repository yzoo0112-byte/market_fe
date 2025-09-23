import { Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { User } from "../type";
import { signUp } from "../api/LoginApi";

export default function SignUpPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const loginIdFromLogin = location.state?.loginId ?? "";

    
    const [toastOpen, setToastOpen] = useState(false);
    const [user, setUser] = useState<User>({
        loginId: loginIdFromLogin,
        password: '',
        nickname: '',
        userName: '',
        phoneNum: '',
        birth: '',
        email: '',
        addr: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    }


    const handleSign = () => {
         signUp(user)
      .then(() => {
        alert("회원가입이 완료되었습니다!");
        navigate("/login", { replace: true });
      })
      .catch(() => setToastOpen(true));

    }

    return(
        <>
        <Stack spacing={2} mt={2} alignItems={"center"}>
            <Typography>회원가입</Typography>
            <TextField 
                label="ID"
                name="loginId"
                value={user.loginId}
                onChange={handleChange}
            />
            <TextField 
                label="PW"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
            />
            <TextField 
                label="nickname"
                name="nickname"
                value={user.nickname}
                onChange={handleChange}
            />
            <TextField 
                label="userName"
                name="userName"
                value={user.userName}
                onChange={handleChange}
            />
            <TextField 
                label="phoneNum"
                name="phoneNum"
                value={user.phoneNum}
                onChange={handleChange}
            />
            <TextField 
                label="birth"
                name="birth"
                value={user.birth}
                onChange={handleChange}
            />
            <TextField 
                label="email"
                name="email"
                value={user.email}
                onChange={handleChange}
            />
            <TextField 
                label="addr"
                name="addr"
                value={user.addr}
                onChange={handleChange}
            />
            
            













            <Button
                color="error"
                onClick={handleSign}
            >
                회원가입하기
            </Button>
            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={() => setToastOpen(false)}
                message="회원가입 실패"
            />
        </Stack>
        </>
    );
}