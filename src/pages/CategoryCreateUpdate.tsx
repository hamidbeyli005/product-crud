import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  ICategory,
  addCategory,
  updateCategory,
} from "../redux/features/categorySlice";

let uniqueIdCounter = 3;

const CreateCategoryPage = ({ isEditing = false }: { isEditing?: boolean }) => {
  const { id } = useParams();
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoryName: "",
    isActive: true,
    products: [],
  });

  useEffect(() => {
    if (isEditing && id) {
      const editedCategory = categories.find(
        (category: ICategory) => category.id === Number(id)
      );
      if (editedCategory) {
        setFormData({
          categoryName: editedCategory.name,
          isActive: editedCategory.status,
          products: editedCategory.products,
        });
      } else {
        toast.error("Kateqoriya tapılmadı!");
        navigate("/categories");
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryName) {
      toast.error("Kateqoriya adı boş ola bilməz.");
      return;
    }

    const updatedCategory: ICategory = {
      id: isEditing ? Number(id) : uniqueIdCounter++,
      name: formData.categoryName,
      status: formData.isActive,
      products: formData.products,
    };

    if (isEditing) {
      dispatch(updateCategory(updatedCategory));
      toast.success("Kateqoriya yeniləndi!");
    } else {
      dispatch(addCategory(updatedCategory));
      toast.success("Kateqoriya əlavə edildi!");
    }
    navigate("/categories");
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  return (
    <div className="container max-w-2xl px-4 pt-8  mx-auto sm:px-8 mt-36">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-bold leading-7 text-gray-900">
              {isEditing ? "Edit" : "Create"} category:
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-6 relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="isActive"
                    className="font-medium text-gray-900"
                  >
                    Active
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryPage;
