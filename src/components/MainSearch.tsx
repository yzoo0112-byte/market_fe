import { useState, useEffect } from "react";
import { useSearch } from "../contexts/useSearch";
import { useNavigate } from "react-router-dom";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function MainSearch() {
  const { keyword, setKeyword } = useSearch();
  const [input, setInput] = useState(keyword);
  const navigate = useNavigate();

  const onSearch = () => {
    setKeyword(input);
    navigate('/');
  };

  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <InputBase
        fullWidth
        placeholder="검색어를 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <IconButton onClick={onSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
