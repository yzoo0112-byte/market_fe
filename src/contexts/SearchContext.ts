import { createContext } from 'react';

interface SearchContextType {
  keyword: string;
  setKeyword: (k: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  keyword: '',
  setKeyword: () => {},
});
