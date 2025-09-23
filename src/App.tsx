import { Route, Routes } from "react-router-dom";
import PostPage from "./page/PostPage";

function App() {


  return (
    <>
      <Routes>
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>

    </>
  )
}

export default App
