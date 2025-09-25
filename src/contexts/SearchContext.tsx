import { createContext,  type Dispatch, type SetStateAction } from "react";

interface SearchContextType {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType>({
  keyword: "",
  setKeyword: () => {},
});


