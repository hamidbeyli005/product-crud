import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Products from './pages/Products'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import CreateCategoryPage from './pages/CategoryCreateUpdate'
import CreateProductPage from './pages/ProductCreateUpdate'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        <Route path="/products" element={<Products />} />
        <Route path="/create-product" element={<CreateProductPage isEditing={false} />} />
        <Route path="/category/:categoryId/product/:productId" element={<CreateProductPage isEditing={true} />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/create-category" element={<CreateCategoryPage isEditing={false} />} />
        <Route path="/category/:id" element={<CreateCategoryPage isEditing={true} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
