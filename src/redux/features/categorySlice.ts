import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IProduct {
  id: number;
  name: string;
  status: boolean;
}

export interface ICategory {
  id: number;
  name: string;
  status: boolean;
  products: IProduct[];
}

const initialState: ICategory[] = [
  {
    id: 1,
    name: "Electronics",
    status: true,
    products: [
      { id: 1, name: "Phone", status: true },
      { id: 2, name: "Laptop", status: true },
    ],
  },
  {
    id: 2,
    name: "Clothing",
    status: true,
    products: [
      { id: 3, name: "T-shirt", status: true },
      { id: 4, name: "Pant", status: true },
    ],
  },
];

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<{ categoryId: number, product: IProduct }>) => {
      const { categoryId, product } = action.payload;
      const category = state.find((category) => category.id === categoryId);

      if (category) {
        category.products.push(product);
      }
    },
    removeProduct: (state, action: PayloadAction<{ categoryId: number, productId: number }>) => {
      const { categoryId, productId } = action.payload;
      const category = state.find((category) => category.id === categoryId);

      if (category) {
        category.products = category.products.filter(product => product.id !== productId);
      }
    },
    updateProduct: (state, action: PayloadAction<{oldCategoryId:number, newCategoryId: number, productId: number, updatedProduct: IProduct }>) => {
      const { oldCategoryId, newCategoryId, productId, updatedProduct } = action.payload;
      const oldCategory = state.find(category => category.id === oldCategoryId);
      const newCategory = state.find(category => category.id === newCategoryId);

      if (!oldCategory || !newCategory) {
        throw new Error(`Category or product not found`);
      }

      const productIndex = oldCategory.products.findIndex(product => product.id == productId);

      if (productIndex === -1) {
        throw new Error(`Product not found in category`);
      }

      oldCategory.products.splice(productIndex, 1);
      newCategory.products.push(updatedProduct);
    },
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<ICategory>) => {
      const index = state.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      return state.filter(category => category.id !== action.payload);
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  addCategory,
  updateCategory,
  removeCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
