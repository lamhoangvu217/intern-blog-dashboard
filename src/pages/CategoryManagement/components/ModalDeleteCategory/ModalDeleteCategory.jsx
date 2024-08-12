/* eslint-disable react/prop-types */

import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

function ModalDeleteCategory({ openModal, setOpenModal, categoryId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true)
    const response = await axios.delete(
      `${import.meta.env.VITE_SUPABASE_URL}/categories?id=eq.${categoryId}`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      }
    );
    if (response.status === 204) {
        toast.success("Xóa danh mục thành công")
    } else {
        toast.error("Xóa danh mục không thành công")
    }
    setIsDeleting(false)
    setOpenModal(false)
  };
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Xóa danh mục</Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn xóa danh mục này không?</Modal.Body>
      <Modal.Footer>
        <Button color="failure" onClick={handleDelete} isProcessing={isDeleting}>
          Xóa
        </Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteCategory;
