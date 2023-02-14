import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, Product } from "../../api/productService";
import { RootState } from "../../app/store";
import { CategoryConditionType } from "../../components/search/Search";

interface ProductState {
  total: number;
  products: Product[];
  searchedProducts: Product[];
}

export const initialState: ProductState = {
  total: 0,
  products: [],
  searchedProducts: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProducts>) => {
      state.total = action.payload.total;
      state.products = action.payload.products;
      state.searchedProducts = action.payload.products;
    },
    searchProducts: (
      state,
      action: PayloadAction<{
        condition: CategoryConditionType;
        searchTerm: string;
      }>
    ) => {
      const { condition, searchTerm } = action.payload;
      searchTerm.trim().toLowerCase();

      if (!searchTerm.length) {
        state.searchedProducts = state.products;
        return;
      }

      let newSearchedProducts: Product[] = [];

      if (condition === "total") {
        newSearchedProducts = state.products.filter(
          (product) =>
            product.brand.toLowerCase().includes(searchTerm) ||
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
      } else {
        newSearchedProducts = state.products.filter((product) => {
          return product[condition].toLowerCase().includes(searchTerm);
        });
      }

      state.searchedProducts = newSearchedProducts;
    },
  },
});

const selectProductsReducer = (state: RootState) => state.products;

export const selectProducts = createSelector(
  [selectProductsReducer],
  (products) => products.products
);
export const selectSearchedProducts = createSelector(
  [selectProductsReducer],
  (products) => products.searchedProducts
);
export const selectTotalProductCount = createSelector(
  [selectProductsReducer],
  (products) => products.searchedProducts.length
);

export const { setProducts, searchProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
