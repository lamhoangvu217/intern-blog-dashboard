import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

function ModalAddNewAuthor({
  openAddNewAuthorModal,
  setOpenAddNewAuthorModal,
  getAuthorList,
}) {
  const [authorName, setAuthorName] = useState("");
  const [authorJob, setAuthorJob] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [isAddLoading, setIsAddLoading] = useState("");
  const handleAuthorNameChange = (value) => {
    setAuthorName(value);
  };
  const handleAuthorJobChange = (value) => {
    setAuthorJob(value);
  };
  const handleAuthorAvatarChange = (value) => {
    setAuthorAvatar(value);
  };
  const handleAddNewAuthor = async () => {
    setIsAddLoading(true);
    if (authorName === "" || authorJob === "" || authorAvatar === "") {
      toast.error("Điền đầy đủ thông tin trước khi thêm mới");
      return;
    }
    const body = {
      author_name: authorName,
      job_title: authorJob,
      avatar: authorAvatar,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_SUPABASE_URL}/authors`,
      body,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      }
    );
    if (response.status === 201) {
      toast.success("Thêm mới tác giả thành công");
    } else {
      toast.error("Thêm mới tác giả không thành công");
    }
    setIsAddLoading(false);
    setOpenAddNewAuthorModal(false);
  };
  return (
    <Modal
      show={openAddNewAuthorModal}
      onClose={() => setOpenAddNewAuthorModal(false)}
    >
      <Modal.Header>Thêm mới tác giả</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="author_name" value="Tên tác giả" />
            </div>
            <TextInput
              id="author_name"
              type="text"
              placeholder="Nhập tên tác giả"
              onChange={(event) => handleAuthorNameChange(event.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="job_title" value="Job" />
            </div>
            <TextInput
              id="job_title"
              placeholder="Job"
              type="text"
              onChange={(event) => handleAuthorJobChange(event.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="avatar" value="Avatar" />
            </div>
            <TextInput
              id="avatar"
              placeholder="Link avatar here"
              type="text"
              onChange={(event) => handleAuthorAvatarChange(event.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async () => {
            await handleAddNewAuthor();
            await getAuthorList();
          }}
          isProcessing={isAddLoading}
        >
          Thêm mới
        </Button>
        <Button color="gray" onClick={() => setOpenAddNewAuthorModal(false)}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalAddNewAuthor;
