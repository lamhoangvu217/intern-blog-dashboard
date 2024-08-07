import { Button } from "flowbite-react";
import Heading from "../../components/Heading/Heading";
import WrapperComponent from "../../layouts/WrapperComponent/WrapperComponent";
import CategoryList from "./components/CategoryList/CategoryList";
import ModalAddNewCategory from "./components/ModalAddNewCategory/ModalAddNewCategory";
import { useState } from "react";

function CategoryManagement() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <WrapperComponent>
      <div className="flex justify-between items-center mb-4">
        <Heading title={"Quản lý danh mục"} />
        <Button onClick={() => setOpenModal(true)}>Thêm mới danh mục</Button>
      </div>

      <CategoryList />
      <ModalAddNewCategory openModal={openModal} setOpenModal={setOpenModal} />
    </WrapperComponent>
  );
}

export default CategoryManagement;
