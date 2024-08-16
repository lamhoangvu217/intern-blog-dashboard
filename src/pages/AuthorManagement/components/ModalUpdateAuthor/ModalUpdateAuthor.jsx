import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ModalUpdateAuthor({
  openUpdateAuthorModal,
  setOpenUpdateAuthorModal,
  authorId,
}) {
  const [authorName, setAuthorName] = useState("");
  const [authorJob, setAuthorJob] = useState("");
  const [isAddLoading, setIsAddLoading] = useState(false);

  useEffect(() => {
    const fetchAuthorUpdateData = async () => {
      if (authorId) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SUPABASE_URL}/authors?id=eq.${authorId}`,
            {
              headers: {
                apikey: import.meta.env.VITE_SUPABASE_API_KEY,
              },
            }
          );
          if (response.status === 200) {
            const author = response.data[0];
            setAuthorName(author.author_name);
            setAuthorJob(author.job_title);
          } else {
            toast.error("Không thể lấy thông tin tác giả");
          }
        } catch (error) {
          toast.error("Đã xảy ra lỗi !!!");
        }
      }
    };

    if (openUpdateAuthorModal) {
      fetchAuthorUpdateData();
    }
  }, [openUpdateAuthorModal, authorId]);

  const handleUpdateAuthor = async () => {
    setIsAddLoading(true);
    if (authorName === "" || authorJob === "") {
      toast.error("Sửa không hợp lệ !!!");
      setIsAddLoading(false);
      return;
    }

    const body = {
      author_name: authorName,
      job_title: authorJob,
    };

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SUPABASE_URL}/authors?id=eq.${authorId}`,
        body,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_API_KEY,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Sửa tác giả thành công !!!");
      } else {
        toast.error("Sửa tác giả không thành công !!!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi sửa !!!");
    }

    setIsAddLoading(false);
    setOpenUpdateAuthorModal(false);
  };

  return (
    <Modal
      show={openUpdateAuthorModal}
      onClose={() => setOpenUpdateAuthorModal(false)}
    >
      <Modal.Header>Sửa tác giả</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="author_name" value="Tên tác giả"></Label>
            </div>
            <TextInput
              id="author_name"
              type="text"
              placeholder="Sửa tên tác giả"
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
            ></TextInput>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="job_title" value="Job"></Label>
            </div>
            <TextInput
              id="job_title"
              type="text"
              placeholder="Sửa Job"
              value={authorJob}
              onChange={(event) => setAuthorJob(event.target.value)}
            ></TextInput>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdateAuthor} isProcessing={isAddLoading}>
          Cập nhật
        </Button>
        <Button color="gray" onClick={() => setOpenUpdateAuthorModal(false)}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalUpdateAuthor;
