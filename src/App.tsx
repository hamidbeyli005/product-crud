import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './pages/Products'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import CreateCategoryPage from './pages/CategoryCreateUpdate'
import CreateProductPage from './pages/ProductCreateUpdate'
import Layout from './components/Layout'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'products',
          element: <Products />,
        },
        {
          path: 'create-product',
          element: <CreateProductPage />,
        },
        {
          path: 'category/:categoryId/product/:productId',
          element: <CreateProductPage isEditing={true} />,
        },
        {
          path: 'categories',
          element: <Categories />,
        },
        {
          path: 'create-category',
          element: <CreateCategoryPage />,
        },
        {
          path: 'category/:id',
          element: <CreateCategoryPage isEditing={true} />,
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
