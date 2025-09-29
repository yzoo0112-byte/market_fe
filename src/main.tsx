

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: 'MeMoment, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700 },
    h2: { fontSize: '1.75rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },   // 일반 텍스트
    body2: { fontSize: '1rem' },
    button: { fontSize: '1rem', fontWeight: 500 },
  },
  palette: {
    primary: {
       main: '#000000', // 버튼 통일색: 검은색
    },
    secondary: {
      main: '#ff9b49', // 보조 색상
    },
    background: {
      default: '#f5f5f5', // 기본 배경색
      paper: '#ffffff',   // 카드나 모달 배경
    },
    text: {
      primary: '#333333',   // 기본 텍스트 색상
      secondary: '#888888', // 보조 텍스트 색상
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>

)
export default App;
