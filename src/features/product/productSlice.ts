import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Product {
  id: number;
  title: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductState {
  total: number;
  products: Product[];
  limit: number;
}

export const initialState: ProductState = {
  total: 0,
  products: [],
  limit: 0,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductState>) => {
      state.total = action.payload.total;
      state.products = action.payload.products;
      state.limit = action.payload.limit;
    },
  },
});

export const { setProducts } = ProductSlice.actions;
export const selectProducts = (state: RootState) => state.products;

export default ProductSlice.reducer;
