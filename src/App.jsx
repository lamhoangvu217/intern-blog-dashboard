import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryManagement from "./pages/CategoryManagement";
import PostManagement from "./pages/PostManagement";
import AuthorManagement from "./pages/AuthorManagement";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/posts" element={<PostManagement />} />
        <Route path="/authors" element={<AuthorManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
   
  );
}

export default App;
