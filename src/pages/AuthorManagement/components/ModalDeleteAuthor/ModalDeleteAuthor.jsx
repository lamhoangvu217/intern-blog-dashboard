import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

function ModalDeleteAtuthor({ openDeleteModal, setOpenDeleteModal, authorId }) {
  const [isDeletingAuthor, setIsDeletingAuthor] = useState(false);
  const handDeleteAuthor = async () => {
    setIsDeletingAuthor(true);
    const response = await axios.delete(
      `${import.meta.env.VITE_SUPABASE_URL}/authors?id=eq.${authorId}`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      }
    );
    if (response.status === 204) {
      toast.success("Xóa tác giả thành công");
    } else {
      toast.error("Xóa tác giả không thành công");
    }
    setIsDeletingAuthor(false);
    setOpenDeleteModal(false);
  };
  return (
    <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <Modal.Header>Xóa tác giả</Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn xóa tác giả này không?</Modal.Body>
      <Modal.Footer>
        <Button
          color="failure"
          onClick={handDeleteAuthor}
          isProcessing={isDeletingAuthor}
        >
          Xóa
        </Button>
        <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteAtuthor;
