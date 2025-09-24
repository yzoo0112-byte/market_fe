import { Route, Routes } from "react-router-dom";
import PostPage from "./page/PostPage";


function App() {


  return (
    <>
      <div className="min-h-screen bg-white">

        <PostPage />
      </div>
      <Routes>
        <Route path="/post/:id" element={<PostPage />} />

      </Routes>

    </>
  )
}

export default App
