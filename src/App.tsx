
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'

export default function App() {

  return (
    <>
      <Container maxWidth='xl'>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6">
              캐럿마켓
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Container>
    </>
  )
}


