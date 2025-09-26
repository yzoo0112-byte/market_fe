import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("jwt"); // 토큰 제거
    logout();                         // 상태 초기화
    navigate("/login");              // 로그인 페이지로 이동
  };

  const goToMyPage = () => {
    if (isAuthenticated) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };



  return (
    <div className="header">
       <div className="logo">
        <span className="logo-text" onClick={() => navigate("/")}>
          캐럿마켓
        </span>
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <button onClick={() => navigate("/login")}>로그인</button>
        )}
        <IconButton 
          color="inherit"
          onClick={goToMyPage}
          sx={{
            outline: "none",
            boxShadow: "none",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:active": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          <AccountCircleIcon />
        </IconButton>
      </div>
    </div>
  );
}