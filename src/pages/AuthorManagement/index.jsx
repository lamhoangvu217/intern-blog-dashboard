import { Button } from "flowbite-react";
import Heading from "../../components/Heading/Heading";
import WrapperComponent from "../../layouts/WrapperComponent/WrapperComponent";
import AuthorList from "./components/AuthorList/AuthorList";
import ModalAddNewAuthor from "./components/ModalAddNewAuthor/ModalAddNewAuthor";
import { useEffect, useState } from "react";
import axios from "axios";
function AuthorManagement({ getAuthorList }) {
  const [openAddNewAuthorModal, setOpenAddNewAuthorModal] = useState(false);
  const [authorList, setAuthorList] = useState([]);
  // const [isAddLoading, setIsAddLoading] = useState(false);
  async function getAuthorList() {
    // setIsAddLoading(true);
    const response = await axios
      .get(`${import.meta.env.VITE_SUPABASE_URL}/authors`, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      })
      .then((data) => {
        setAuthorList(data.data);
      });
    // setIsAddLoading(false);
  }
  useEffect(() => {
    getAuthorList();
  }, []);

  return (
    <WrapperComponent>
      <div className="flex justify-between items-center mb-4">
        <Heading title={"Quản lý tác giả"} />
        <div className="flex gap-3">
          <Button onClick={() => setOpenAddNewAuthorModal(true)}>
            Thêm mới tác giả
          </Button>
          {/* <Button onClick={() => getAuthorList()} isProcessing={isAddLoading}>
            Refresh
          </Button> */}
        </div>
      </div>

      <AuthorList authorList={authorList} />
      <ModalAddNewAuthor
        openAddNewAuthorModal={openAddNewAuthorModal}
        setOpenAddNewAuthorModal={setOpenAddNewAuthorModal}
        getAuthorList={getAuthorList}
      />
    </WrapperComponent>
  );
}

export default AuthorManagement;
