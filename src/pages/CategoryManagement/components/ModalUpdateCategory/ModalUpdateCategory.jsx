import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ModalUpdateCategory({
  openUpdateModal,
  setOpenUpdateModal,
  categoryId,
}) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryNote, setCategoryNote] = useState("");
  const [isAddLoading, setIsAddLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryUpdateData = async () => {
      if (categoryId) {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_SUPABASE_URL
            }/categories?id=eq.${categoryId}`,
            {
              headers: {
                apikey: import.meta.env.VITE_SUPABASE_API_KEY,
              },
            }
          );
          if (response.status === 200) {
            const category = response.data[0];
            setCategoryName(category.category_name);
            setCategoryNote(category.description);
          } else {
            toast.error("Không thể lấy thông tin danh mục");
          }
        } catch (error) {
          toast.error("Đã xảy ra lỗi khi lấy thông tin danh mục");
        }
      }
    };

    if (openUpdateModal) {
      fetchCategoryUpdateData();
    }
  }, [openUpdateModal, categoryId]);

  const handleUpdateCategory = async () => {
    setIsAddLoading(true);
    if (categoryName === "" || categoryNote === "") {
      toast.error("Sửa không hợp lệ !!!");
      setIsAddLoading(false);
      return;
    }

    const body = {
      category_name: categoryName,
      description: categoryNote,
    };

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SUPABASE_URL}/categories?id=eq.${categoryId}`,
        body,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_API_KEY,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Sửa danh mục thành công");
      } else {
        toast.error("Sửa danh mục không thành công");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi sửa danh mục");
    }

    setIsAddLoading(false);
    setOpenUpdateModal(false);
  };

  return (
    <Modal show={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
      <Modal.Header>Sửa danh mục</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category_name" value="Tên danh mục" />
            </div>
            <TextInput
              id="category_name"
              type="text"
              placeholder="Sửa tên danh mục"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Ghi chú" />
            </div>
            <TextInput
              id="description"
              placeholder="Sửa ghi chú"
              type="text"
              value={categoryNote}
              onChange={(event) => setCategoryNote(event.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdateCategory} isProcessing={isAddLoading}>
          Cập nhật
        </Button>
        <Button color="gray" onClick={() => setOpenUpdateModal(false)}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUpdateCategory;
