import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

export default function Header() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("jwt"); // 토큰 제거
    logout();                         // 상태 초기화
    navigate("/login");              // 로그인 페이지로 이동
  };

  return (
    <div className="header">
      <div className="logo">캐럿마켓</div>
      <div className="nav-right">
        {isAuthenticated ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <button onClick={() => navigate("/login")}>로그인</button>
        )}
      </div>
    </div>
  );
}