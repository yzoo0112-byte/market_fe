import { Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { LoginUser } from "../type";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { getAuthToken } from "../api/LoginApi";



export default function  Login(){

    const navigate = useNavigate();
    const {login} = useAuthStore();
    const [toastOpen, setToastOpen] = useState(false);
    const [user, setUser] = useState<LoginUser>({
        loginId: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSignUp = () => {
    navigate("/signup");
    };


    const handleLogin = () => {
        getAuthToken(user)
      .then((token) => {
        sessionStorage.setItem("jwt", token);
        login();
        navigate("/");
      })
      .catch(() => {
        setUser({ ...user, password: "" }); // 비밀번호 초기화
        //setToastOpen(true); // 실패 메시지
      });


    }


    return(
        <>
        <Stack spacing={2} mt={2} alignItems={"center"}>
            <Typography>로그인 페이지</Typography>
            <TextField 
                label="ID"
                name="loginId"
                value={user.loginId}
                onChange={handleChange}
            />
            <TextField 
                label="PW"
                name="password"
                value={user.password}
                onChange={handleChange}
            />
            <Button
                onClick={handleSignUp}
            >
                회원가입
            </Button>
            <Button
                color="primary"
                onClick={handleLogin}
            >
                로그인
            </Button>
            <Snackbar 
                open={toastOpen}
                autoHideDuration={3000}
                onClose={() => setToastOpen(false)}
                message="로그인 실패"
            />
        </Stack>
        </>
    );
}