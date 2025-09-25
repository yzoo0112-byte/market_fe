import { useState } from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../contexts/useSearch";

export default function MainSearch() {
  const { setKeyword } = useSearch();
  const [input, setInput] = useState("");

  const onSearch = () => {
    // 입력값 trim + 공백 기준 여러 키워드 배열로 분리해서 다시 조립해도 되고
    // 여기서는 그대로 setKeyword에 넣음 (백엔드에서 처리)
    setKeyword(input.trim());
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <InputBase
        fullWidth
        placeholder="검색어를 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <IconButton onClick={onSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
