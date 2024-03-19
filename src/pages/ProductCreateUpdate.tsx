import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import {
  ICategory,
  IProduct,
  addProduct,
  updateProduct,
} from "../redux/features/categorySlice";
import { useNavigate } from "react-router-dom";

let uniqueIdCounter = 5;

const CreateProductPage = ({ isEditing }: { isEditing: boolean }) => {
  const { categoryId, productId } = useParams();
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    selectedCategory: "",
    isActive: true,
  });

  useEffect(() => {
    if (isEditing && categoryId && productId) {
      const editedProduct = categories
        .find((product: ICategory) => product.id === Number(categoryId))
        .products.find((product: IProduct) => product.id === Number(productId));

      if (editedProduct) {
        setFormData({
          productName: editedProduct.name,
          selectedCategory: categoryId,
          isActive: editedProduct.status,
        });
      } else {
        toast.error("Məhsul tapılmadı!");
        navigate("/products");
      }
    }
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName || !formData.selectedCategory) {
      toast.error("Tələb olunan bütün sahələri doldurun.");
      return;
    }

    const updatedProduct: IProduct = {
      id: isEditing ? Number(productId) : uniqueIdCounter++,
      name: formData.productName,
      status: formData.isActive,
    };

    if (isEditing) {
      dispatch(
        updateProduct({
          categoryId: Number(formData.selectedCategory),
          productId: Number(productId),
          updatedProduct: updatedProduct,
        })
      );
      toast.success("Məhsul yeniləndi!");
    } else {
      dispatch(
        addProduct({
          categoryId: Number(formData.selectedCategory),
          product: updatedProduct,
        })
      );
      toast.success("Məhsul əlavə edildi!");
    }
    navigate("/products");
  };

  const handleCancel = () => {
    navigate("/products");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  return (
    <Layout>
      <div className="container max-w-2xl px-4 pt-8 mx-auto sm:px-8 mt-36">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-bold leading-7 text-gray-900">
                {isEditing ? "Edit" : "Create"} product:
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={formData.productName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="selectedCategory"
                      name="selectedCategory"
                      autoComplete="selectedCategory"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={formData.selectedCategory}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled hidden>
                        Choose here
                      </option>
                      {categories?.map((category: ICategory) => (
                        category.status && (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        )
                      ))}
                    </select>
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
    </Layout>
  );
};

export default CreateProductPage;
