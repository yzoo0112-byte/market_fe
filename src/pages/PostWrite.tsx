import { useState } from "react";

export default function PostWrite() {
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleSave = async() => {
    const formData = new FormData();
    formData.append("title", title)
    formData.append("hashtags", hashtags)
    formData.append("content", content)
    files.forEach((files) => {
      formData.append("files", files);
    });

    try {
      const res = await fetch("http://localhost:8080/posts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("서버 응답:", data);
      alert("게시글이 등록되었습니다.");
    } catch (err) {
      console.error("에러 발생:", err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("작성 중인 내용을 취소하시겠습니까?")) {
      setTitle("");
      setHashtags("");
      setContent("");
      setFiles([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 상단바 */}
      <header className="w-full bg-white shadow px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">로고</div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-1/3 p-2 border rounded focus:ring focus:ring-blue-300"
        />
        <button className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          로그인/로그아웃
        </button>
      </header>

      {/* 본문 */}
      <main className="flex-1 flex justify-center items-start p-10">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          {/* 제목 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="게시글 제목을 입력하세요"
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
            />
          </div>

          {/* 해시태그 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">해시태그</label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="예: #프로젝트, #공지, #노션"
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
            />
            <p className="text-sm text-gray-500 mt-1">쉼표(,)로 구분하여 입력</p>
          </div>

          {/* 본문 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">본문 내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="게시글 내용을 입력하세요"
              className="w-full p-4 border rounded h-60 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* 첨부파일 */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">첨부파일</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full"
            />
            <ul className="mt-3 space-y-1 text-sm text-gray-700">
              {files.map((file, idx) => (
                <li key={idx} className="border-b pb-1">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              등록
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              취소
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}