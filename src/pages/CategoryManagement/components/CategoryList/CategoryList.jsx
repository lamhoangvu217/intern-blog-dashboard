import axios from "axios";
import { Tooltip } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ModalDeleteCategory from "../ModalDeleteCategory/ModalDeleteCategory";
function CategoryList() {
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  async function getCategoryList() {
    const response = await axios
      .get(`${import.meta.env.VITE_SUPABASE_URL}/categories`, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      })
      .then((data) => {
        setCategoryList(data.data);
      });
  }
  useEffect(() => {
    getCategoryList();
  }, []);
  const handleOpenDeleteModal = (categoryId) => {
    setActiveCategoryId(categoryId);
    setDeleteModalOpen(true);
  };
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              STT
            </th>
            <th scope="col" className="px-6 py-3">
              Mã danh mục
            </th>
            <th scope="col" className="px-6 py-3">
              Tên danh mục
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày tạo
            </th>
            <th scope="col" className="px-6 py-3">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((cate, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={cate?.id}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{cate.id}</td>
              <td className="px-6 py-4">{cate.category_name}</td>
              <td className="px-6 py-4">
                {moment(cate.created_at).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 flex gap-4">
                <Tooltip content="Sửa">
                  <MdEdit />
                </Tooltip>
                <Tooltip content="Xóa">
                  <FaTrash onClick={() => handleOpenDeleteModal(cate.id)} />
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalDeleteCategory
        openModal={deleteModalOpen}
        setOpenModal={setDeleteModalOpen}
        categoryId={activeCategoryId}
      />
    </div>
  );
}

export default CategoryList;
