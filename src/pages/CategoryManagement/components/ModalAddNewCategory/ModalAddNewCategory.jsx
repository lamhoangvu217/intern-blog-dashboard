/* eslint-disable react/prop-types */
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddCategoryMutation } from "../../../../store/slices/categorySlice";

function ModalAddNewCategory({ openAddNewModal, setOpenAddNewModal }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryNote, setCategoryNote] = useState("");
  const [isAddLoading, setIsAddLoading] = useState("");
  const [addCategory] = useAddCategoryMutation()
  const handleCategoryNameChange = (value) => {
    setCategoryName(value);
  };
  const handleCategoryNoteChange = (value) => {
    setCategoryNote(value);
  };
  const handleAddNewCategory = async () => {
    setIsAddLoading(true);
    if (categoryName === "" || categoryNote === "") {
      toast.error("Điền đầy đủ thông tin trước khi thêm mới");
      return;
    }
    const body = {
      category_name: categoryName,
      description: categoryNote,
    };
    await addCategory(body).unwrap().then(() => {
      toast.success("Thêm mới danh mục thành công");
    }).catch(() => {
      toast.error("Thêm mới danh mục không thành công");
    });
    setIsAddLoading(false);
    setOpenAddNewModal(false);
  };

  return (
    <Modal show={openAddNewModal} onClose={() => setOpenAddNewModal(false)}>
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
        <Button onClick={handleAddNewCategory} isProcessing={isAddLoading}>
          Thêm mới
        </Button>
        <Button color="gray" onClick={() => setOpenAddNewModal(false)}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddNewCategory;
