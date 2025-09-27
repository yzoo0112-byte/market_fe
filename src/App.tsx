
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import Header from './pages/Header'
import MyPage from './pages/MyPage'
import PostPage from './pages/PostPage'
import PostWrite from "./pages/PostWrite";
import TableView from './components/TableView'
import { SearchProvider } from './contexts/SearchProvider'
import PostEdit from './pages/PostEdit'
import AdminUserList from './list/AdminUserList'
import ManageFileSetting from './components/ManageFileSetting'




export default function App() {
  return (
    <BrowserRouter>
    {/* <AuthProvider> */}
      <SearchProvider>
        <CssBaseline />
        <AppBar position="fixed" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6">
              <Header />
            </Typography>
          </Toolbar>
        </AppBar>

        {/* ✅ AppBar 높이만큼 여백 확보 */}
        <Toolbar />
        <Container maxWidth="xl">
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/post/edit/:id" element={<PostEdit />} />
            <Route path="/post" element={<PostWrite />} />
            <Route path="/" element={<TableView />} />
            <Route path="/manage/users" element={<AdminUserList />} />
            <Route path="/manage/fileSetting" element={<ManageFileSetting/>} />
          </Routes>
        </Container>
      </SearchProvider>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

