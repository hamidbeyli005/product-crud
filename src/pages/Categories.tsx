import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ICategory, removeCategory } from "../redux/features/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);

  const handleRemoveCategory = (categoryId: number) => {
    const isConfirmed = window.confirm(
      "Kateqoriyanı silmək istədiyinizdən əminsiniz?"
    );
    if (isConfirmed) {
      dispatch(removeCategory(categoryId));
    }
  };

  return (
    <Layout>
      <div className="container max-w-7xl px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="mt-6 overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden rounded-lg border  shadow bg-[#fff] py-[4%] px-[3%]">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Categories</h1>
                <Link
                  to="/create-category"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm py-2 px-4 rounded-md"
                >
                  Add category
                </Link>
              </div>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-4 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 min-w-[200px] w-[200px] py-4 text-sm font-semibold text-left text-gray-800 uppercase border-b border-gray-200"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category: ICategory) => (
                    <tr key={category.id}>
                      <td className="px-5 py-4 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {category.id}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {category.name}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm bg-white border-b border-gray-200">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                            category.status ? "text-green-900" : "text-red-900"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`absolute inset-0 rounded-full opacity-50 ${
                              category.status ? "bg-green-200" : "bg-red-200"
                            }`}
                          ></span>
                          <span className="relative">
                            {category.status ? "active" : "inactive"}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm bg-white border-b border-gray-200">
                        <Link
                          to={`/category/${category.id}`}
                          className="bg-blue-500 hover:bg-blue-700 leading-4 text-white font-sm py-2 px-4 mr-4 rounded-md"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleRemoveCategory(category.id)}
                          className="bg-rose-600 hover:bg-rose-700 leading-4 text-white font-sm py-2 px-4 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
