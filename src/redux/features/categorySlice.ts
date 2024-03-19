import { createSlice } from "@reduxjs/toolkit";

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
    addProduct: (state, action) => {
      const { categoryId, product } = action.payload;
      console.log(categoryId, product);
      const category = state.find((category) => category.id === categoryId);

      if (category) {
        category.products.push(product);
      }
    },
    removeProduct: (state, action) => {
      const { categoryId, productId } = action.payload;
      const categoryIndex = state.findIndex(
        (category) => category.id === categoryId
      );

      if (categoryIndex !== -1) {
        state[categoryIndex].products = state[categoryIndex].products.filter(
          (product) => {
            return product.id !== productId;
          }
        );
      }
    },
    updateProduct: (state, action) => {
      const { categoryId, productId, updatedProduct } = action.payload;
      const oldCategory = state.find((category) =>
        category.products.some((product) => product.id == productId)
      );
      if (!oldCategory) {
        console.error(`Category with product id ${productId} not found.`);
        return;
      }
      const productIndex = oldCategory.products.findIndex(
        (product) => product.id === productId
      );
      if (productIndex === -1) {
        console.error(
          `Product with id ${productId} not found in category ${oldCategory.id}.`
        );
        return;
      }
      const removedProduct = oldCategory.products.splice(productIndex, 1)[0];
      const newCategory = state.find((category) => category.id === categoryId);
      if (!newCategory) {
        console.error(`Category with id ${categoryId} not found.`);
        oldCategory.products.splice(productIndex, 0, removedProduct);
        return;
      }
      newCategory.products.push(updatedProduct);
    },

    addCategory: (state, action) => {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeCategory: (state, action) => {
      return state.filter((category) => category.id !== action.payload);
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
