import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ModalUpdatePost({
  openUpdatePostModal,
  setOpenUpdatePostModal,
  postId,
}) {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [isAddLoading, setIsAddLoading] = useState(false);

  useEffect(() => {
    const fetchPostUpdateData = async () => {
      if (postId) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SUPABASE_URL}/posts?id=eq.${postId}`,
            {
              headers: {
                apikey: import.meta.env.VITE_SUPABASE_API_KEY,
              },
            }
          );
          if (response.status === 200) {
            const post = response.data[0];
            setPostName(post.title);
            setPostContent(post.content);
          } else {
            toast.error("Không thể lấy thông tin bài đăng");
          }
        } catch (error) {
          toast.error("Đã xảy ra lỗi !!!");
        }
      }
    };

    if (openUpdatePostModal) {
      fetchPostUpdateData();
    }
  }, [openUpdatePostModal, postId]);

  const handleUpdatePost = async () => {
    setIsAddLoading(true);
    if (postName === "" || postContent === "") {
      toast.error("Sửa không hợp lệ !!!");
      setIsAddLoading(false);
      return;
    }

    const body = {
      title: postName,
      content: postContent,
    };

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SUPABASE_URL}/posts?id=eq.${postId}`,
        body,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_API_KEY,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Sửa bài đăng thành công");
      } else {
        toast.error("Sửa bài đăng không thành công");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi sửa");
    }

    setIsAddLoading(false);
    setOpenUpdatePostModal(false);
  };

  return (
    <Modal
      show={openUpdatePostModal}
      onClose={() => setOpenUpdatePostModal(false)}
    >
      <Modal.Header>Sửa bài đăng</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Tên bài đăng"></Label>
            </div>
            <TextInput
              id="title"
              type="text"
              placeholder="Sửa bài đăng"
              value={postName}
              onChange={(event) => setPostName(event.target.value)}
            ></TextInput>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="content" value="Content"></Label>
            </div>
            <TextInput
              id="content"
              type="text"
              placeholder="Sửa bài đăng"
              value={postContent}
              onChange={(event) => setPostContent(event.target.value)}
            ></TextInput>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdatePost} isProcessing={isAddLoading}>
          Cập nhật
        </Button>
        <Button color="gray" onClick={() => setOpenUpdatePostModal(false)}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalUpdatePost;
