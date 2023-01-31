import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, Product } from "../../api/productService";
import { RootState } from "../../app/store";

interface ProductState {
  total: number;
  products: Product[];
}

export const initialState: ProductState = {
  total: 0,
  products: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProducts>) => {
      state.total = action.payload.total;
      state.products = action.payload.products;
    },
  },
});

const selectProductsReducer = (state: RootState) => state.products;

export const selectProducts = createSelector(
  [selectProductsReducer],
  (products) => products.products
);
export const selectTotalProductCount = createSelector(
  [selectProductsReducer],
  (products) => products.total
);

export const { setProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
