import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"

export default function PostWriteBtn() {
    
    const navigate = useNavigate();

  const handleClick = () => {
    const token = sessionStorage.getItem("jwt");
    console.log("토큰:", token);
    if (token) {
      navigate("/post");
    } else {
      navigate("/login", { state: { from: "/post/" } });
    }
  };

  

  return (
    <Button variant="contained" onClick={handleClick}
     sx={{
    backgroundColor: "#f2f2f2",
    boxShadow: "none",
    color: "#000",
    "&:hover": {
      backgroundColor: "#B0B0B0",
    }
    }}
    >
      글쓰기
    </Button>
  );

}