
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import Header from './pages/Header'
import MyPage from './pages/MyPage'
import PostPage from './page/PostPage'
import PostWrite from "./pages/PostWrite";


export default function App() {
  return (
    <>
      <Container maxWidth='xl'>
        <CssBaseline />
        <AppBar position="fixed"  color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" >
              <Header />
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/posts" element={<PostWrite />} />
        </Routes>
      </Container>
    </>
  )
}


