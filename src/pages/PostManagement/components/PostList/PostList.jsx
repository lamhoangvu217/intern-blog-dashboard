import axios from "axios";
import { Tooltip } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ModalDeletePost from "../ModalDeletePost/ModalDeletePost";
import ModalUpdatePost from "../ModalUpdatePost/ModalUpdatePost";
function PostList({ postList }) {
  const [activePostId, setActivePostId] = useState(0);
  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);
  const [openUpdatePostModal, setOpenUpdatePostModal] = useState(false);
  const handleOpenDeletePostModal = (postId) => {
    setActivePostId(postId);
    setOpenDeletePostModal(true);
  };
  const handleOpenUpdatePostModal = (postId) => {
    setActivePostId(postId);
    setOpenUpdatePostModal(true);
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
              Mã bài đăng
            </th>
            <th scope="col" className="px-6 py-3">
              Tên bài đăng
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
          {postList.map((cate, index) => (
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
              <td className="px-6 py-4">{cate.title}</td>
              <td className="px-6 py-4">
                {moment(cate.created_at).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 flex gap-4">
                <Tooltip content="Sửa">
                  <MdEdit
                    className="cursor-pointer"
                    onClick={() => handleOpenUpdatePostModal(cate.id)}
                  />
                </Tooltip>
                <Tooltip content="Xóa">
                  <FaTrash
                    className="cursor-pointer"
                    onClick={() => handleOpenDeletePostModal(cate.id)}
                  />
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalDeletePost
        openDeletePostModal={openDeletePostModal}
        setOpenDeletePostModal={setOpenDeletePostModal}
        postId={activePostId}
      />
      <ModalUpdatePost
        openUpdatePostModal={openUpdatePostModal}
        setOpenUpdatePostModal={setOpenUpdatePostModal}
        postId={activePostId}
      />
    </div>
  );
}
export default PostList;
