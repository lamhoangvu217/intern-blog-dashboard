import { Button } from "flowbite-react";
import Heading from "../../components/Heading/Heading";
import WrapperComponent from "../../layouts/WrapperComponent/WrapperComponent";
import CategoryList from "./components/CategoryList/CategoryList";
import ModalAddNewCategory from "./components/ModalAddNewCategory/ModalAddNewCategory";
import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../store/slices/categorySlice";
function CategoryManagement() {
  const [openAddNewModal, setOpenAddNewModal] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const { data: categories } = useGetCategoriesQuery();

  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }
  }, [categories])
  return (
    <WrapperComponent>
      <div className="flex justify-between items-center mb-4">
        <Heading title={"Quản lý danh mục"} />
        <div className="flex gap-3">
          <Button onClick={() => setOpenAddNewModal(true)}>
            Thêm mới danh mục
          </Button>
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
