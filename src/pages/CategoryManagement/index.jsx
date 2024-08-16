import { Button } from "flowbite-react";
import Heading from "../../components/Heading/Heading";
import WrapperComponent from "../../layouts/WrapperComponent/WrapperComponent";
import CategoryList from "./components/CategoryList/CategoryList";
import ModalAddNewCategory from "./components/ModalAddNewCategory/ModalAddNewCategory";
import { useEffect, useState } from "react";
import axios from "axios";
function CategoryManagement({ getCategoryList }) {
  const [openAddNewModal, setOpenAddNewModal] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
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
  return (
    <WrapperComponent>
      <div className="flex justify-between items-center mb-4">
        <Heading title={"Quản lý danh mục"} />
        <div className="flex gap-3">
          <Button onClick={() => setOpenAddNewModal(true)}>
            Thêm mới danh mục
          </Button>
          <Button onClick={() => getCategoryList()}>Refresh</Button>
        </div>
      </div>

      <CategoryList categoryList={categoryList} />
      <ModalAddNewCategory
        openAddNewModal={openAddNewModal}
        setOpenAddNewModal={setOpenAddNewModal}
      />
    </WrapperComponent>
  );
}

export default CategoryManagement;
