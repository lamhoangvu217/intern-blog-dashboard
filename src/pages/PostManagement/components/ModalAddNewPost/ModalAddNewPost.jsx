import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

function ModalAddNewPost({ openAddNewPostModal, setOpenAddNewPostModal }) {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isAddLoading, setIsAddLoading] = useState(false);
  const handlePostNameChange = (value) => {
    setPostName(value);
  };
  const handlePostContentChange = (value) => {
    setPostContent(value);
  };
  const handleAddNewPost = async () => {
    setIsAddLoading(true);
    if (postName === "" || postContent === "") {
      toast.error("Điền đầy đủ thông tin trước khi thêm mới");
      return;
    }
    const body = {
      title: postName,
      content: postContent,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_SUPABASE_URL}/posts`,
      body,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      }
    );
    if (response.status === 201) {
      toast.success("Thêm mới bài viết thành công");
    } else {
      toast.error("Thêm mới bài viết thất bại");
    }
    setIsAddLoading(false);
    setOpenAddNewPostModal(false);
  };

  return (
    <Modal
      show={openAddNewPostModal}
      onClose={() => setOpenAddNewPostModal(false)}
    >
      <Modal.Header>Thêm mới bài đăng</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Tên bài đăng"></Label>
            </div>
            <TextInput
              id="title"
              type="text"
              placeholder="Nhập tên bài đăng"
              onChange={(event) => handlePostNameChange(event.target.value)}
            ></TextInput>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="content" value="Content"></Label>
            </div>
            <TextInput
              id="content"
              placeholder="Content here"
              type="text"
              onChange={(event) => handlePostContentChange(event.target.value)}
            ></TextInput>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddNewPost} isProcessing={isAddLoading}>
          Thêm mới
        </Button>
        <Button color="gray" onClick={() => setOpenAddNewPostModal(false)}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalAddNewPost;
