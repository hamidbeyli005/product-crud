import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/categorySlice.js";


const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof categoryReducer | any>;

