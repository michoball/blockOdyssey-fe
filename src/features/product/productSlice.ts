import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, Product } from "../../api/productService";
import { RootState } from "../../app/store";

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

const conditionProduct = (condiion: keyof Product) => {};

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
        condition:
          | keyof Pick<Product, "brand" | "description" | "title">
          | "total";
        searchTerm: string;
      }>
    ) => {
      const { condition, searchTerm } = action.payload;
      searchTerm.trim().toLowerCase();

      if (!searchTerm.length) {
        state.searchedProducts = state.products;
        return;
      }

      if (condition === "total") {
        // 여기서 total경우 따로 설정
      }
      //condiion에 따른 값 if가 아닌 다르게 나타낼 수 있을 것 같은데...
      // condition을 Pick<Product, 'brand' | 'desc' | 'title > 과 비슷하게 가야할 듯
      state.products.forEach((product) => {
        Object.keys(product).filter((name) => name === condition);
        if (condition === "total") return;
        return product[condition].toLowerCase().includes(searchTerm);
      });

      let newSearchedProducts: Product[] = [];

      if (condition === "brand") {
        newSearchedProducts = state.products.filter((product) =>
          product.brand.toLowerCase().includes(searchTerm)
        );
      } else if (condition === "title") {
        newSearchedProducts = state.products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm)
        );
      } else if (condition === "description") {
        newSearchedProducts = state.products.filter((product) =>
          product.description.toLowerCase().includes(searchTerm)
        );
      } else if (condition === "total") {
        newSearchedProducts = state.products.filter(
          (product) =>
            product.brand.toLowerCase().includes(searchTerm) ||
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
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
