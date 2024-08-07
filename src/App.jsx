import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryManagement from "./pages/CategoryManagement";
import PostManagement from "./pages/PostManagement";
import AuthorManagement from "./pages/AuthorManagement";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/posts" element={<PostManagement />} />
        <Route path="/authors" element={<AuthorManagement />} />
      </Routes>
    </BrowserRouter>
    </>
   
  );
}

export default App;
