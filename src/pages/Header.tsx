import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { isAdmin } from "../utils/auth";
import MainSearch from "../components/MainSearch";

export default function Header() {
  const { isAuthenticated, userInfo, logout } = useAuthStore();
  const navigate = useNavigate();

  // sessionStorage에서 토큰을 가져옴
  const token = sessionStorage.getItem("jwt") ?? "";

  // 관리자 권한 체크
  const admin = isAdmin(token);

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
      <div className="logo" onClick={() => navigate("/")}>
        캐럿마켓
      </div>

      {/* 일반 사용자일 때 검색창 보이기 */}
      {!admin && (
        <Box flex={5} display="flex" justifyContent="center" mt={2}>
          <MainSearch />
        </Box>
      )}

      {/* ADMIN에서만 쓸 수 있는 페이지 카테고리 보이기 */}
      {isAuthenticated && admin && (
        <>
          <Box display="flex" justifyContent="center" flex={2}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/manage/fileSetting')}
            >
              관리자
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" flex={2}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/manage/users')}
            >
              회원데이터
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" flex={2}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/manage/posts')}
            >
              게시글데이터
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" flex={2}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/manage/trash')}
            >
              휴지통
            </Button>
          </Box>
        </>
      )}

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
