import axios from "axios";
import { Tooltip } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ModalDeleteAtuthor from "../ModalDeleteAuthor/ModalDeleteAuthor";
import ModalUpdateAuthor from "../ModalUpdateAuthor/ModalUpdateAuthor";
function AuthorList({ authorList }) {
  const [activeAuthorId, setActiveAuthorId] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateAuthorModal, setOpenUpdateAuthorModal] = useState(false);
  const handleOpenDeleteModal = (authorId) => {
    setActiveAuthorId(authorId);
    setOpenDeleteModal(true);
  };
  const handleOpenUpdateAuthorModal = (authorId) => {
    setActiveAuthorId(authorId);
    setOpenUpdateAuthorModal(true);
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
              Mã tác giả
            </th>
            <th scope="col" className="px-6 py-3">
              Tên tác giả
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
          {authorList.map((cate, index) => (
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
              <td className="px-6 py-4">{cate.author_name}</td>
              <td className="px-6 py-4">
                {moment(cate.created_at).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 flex gap-4">
                <Tooltip content="Sửa">
                  <MdEdit
                    className="cursor-pointer"
                    onClick={() => handleOpenUpdateAuthorModal(cate.id)}
                  />
                </Tooltip>
                <Tooltip content="Xóa">
                  <FaTrash
                    className="cursor-pointer"
                    onClick={() => handleOpenDeleteModal(cate.id)}
                  />
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalDeleteAtuthor
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        authorId={activeAuthorId}
      />
      <ModalUpdateAuthor
        openUpdateAuthorModal={openUpdateAuthorModal}
        setOpenUpdateAuthorModal={setOpenUpdateAuthorModal}
        authorId={activeAuthorId}
      />
    </div>
  );
}
export default AuthorList;
