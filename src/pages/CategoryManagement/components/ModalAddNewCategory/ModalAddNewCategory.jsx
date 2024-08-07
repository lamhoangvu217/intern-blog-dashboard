/* eslint-disable react/prop-types */
import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

function ModalAddNewCategory({ openModal, setOpenModal }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryNote, setCategoryNote] = useState("");
  const handleCategoryNameChange = (value) => {
    setCategoryName(value);
  };
  const handleCategoryNoteChange = (value) => {
    setCategoryNote(value);
  };
  const handleAddNewCategory = async () => {
    if (categoryName === "" || categoryNote === "") {
      toast.error("Điền đầy đủ thông tin trước khi thêm mới");
      return;
    }
    const body = {
      category_name: categoryName,
      description: categoryNote,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_SUPABASE_URL}/categories`,
      body,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      }
    );
    if (response.status === 201) {
      toast.success("Thêm mới danh mục thành công");
    } else {
      toast.error("Thêm mới danh mục không thành công");
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Thêm mới danh mục</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category_name" value="Tên danh mục" />
            </div>
            <TextInput
              id="category_name"
              type="text"
              placeholder="Nhập tên danh mục"
              onChange={(event) => handleCategoryNameChange(event.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Ghi chú" />
            </div>
            <TextInput
              id="description"
              placeholder="Nhập ghi chú"
              type="text"
              onChange={(event) => handleCategoryNoteChange(event.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddNewCategory}>Thêm mới</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddNewCategory;
