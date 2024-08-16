import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

function ModalDeletePost({
  openDeletePostModal,
  setOpenDeletePostModal,
  postId,
}) {
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const handDeletePost = async () => {
    setIsDeletingPost(true);
    const response = await axios.delete(
      `${import.meta.env.VITE_SUPABASE_URL}/posts?id=eq.${postId}`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      }
    );
    if (response.status === 204) {
      toast.success("Xóa bài đăng thành công");
    } else {
      toast.error("Xóa bài đăng thất bại");
    }
    setIsDeletingPost(false);
    setOpenDeletePostModal(false);
  };
  return (
    <Modal
      show={openDeletePostModal}
      onClose={() => setOpenDeletePostModal(false)}
    >
      <Modal.Header>Xóa bài đăng</Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn xóa bài viết này không ?</Modal.Body>
      <Modal.Footer>
        <Button
          color="failure"
          onClick={handDeletePost}
          isProcessing={isDeletingPost}
        >
          Delete
        </Button>
        <Button color="gray" onClick={() => setOpenDeletePostModal(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalDeletePost;
