import { Button } from "flowbite-react";
import Heading from "../../components/Heading/Heading";
import WrapperComponent from "../../layouts/WrapperComponent/WrapperComponent";
import { useEffect, useState } from "react";
import PostList from "./components/PostList/PostList";
import ModalAddNewPost from "./components/ModalAddNewPost/ModalAddNewPost";
import axios from "axios";
function PostManagement({ getPostList }) {
  const [postList, setPostList] = useState([]);
  const [openAddNewPostModal, setOpenAddNewPostModal] = useState(false);
  async function getPostList() {
    const response = await axios
      .get(`${import.meta.env.VITE_SUPABASE_URL}/posts`, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      })
      .then((data) => setPostList(data.data));
  }
  useEffect(() => {
    getPostList();
  }, []);
  return (
    <WrapperComponent>
      <div className="flex justify-between items-center mb-4">
        <Heading title={"Quản lý bài đăng"}></Heading>
        <div className="flex gap-3">
          <Button onClick={() => setOpenAddNewPostModal(true)}>
            Thêm mới bài đăng
          </Button>
          <Button onClick={() => getPostList()}>Refresh</Button>
        </div>
      </div>
      <PostList postList={postList} />
      <ModalAddNewPost
        openAddNewPostModal={openAddNewPostModal}
        setOpenAddNewPostModal={setOpenAddNewPostModal}
      />
    </WrapperComponent>
  );
}

export default PostManagement;
