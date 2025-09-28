import { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../contexts/useSearch";
import { useLocation, useNavigate } from "react-router-dom";

export default function MainSearch() {
  const { setKeyword } = useSearch();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onSearch = () => {
    const keyword = input.trim();
    setKeyword(keyword);

    // 검색 시 항상 "/" 페이지로 이동 (검색 결과 보여주는 곳이 홈이라고 가정)
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

    
  

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <InputBase
        fullWidth
        placeholder="검색어를 입력하세요. 해시태그 검색시 #~ #~ 같이 공백으로 구분시켜줘요."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        sx={{
          backgroundColor: 'white',
          padding: '6px 12px',
          borderRadius: '4px',
          color: '#aaa',
          width: '600px'
        }}
      />
      <IconButton onClick={onSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
