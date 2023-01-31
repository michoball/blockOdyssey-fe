import React, { useEffect } from "react";
import "./App.styles.scss";
import { useAppDispatch } from "./app/hooks";
import ListContainer from "./components/list/ListContainer";
import Search from "./components/search/Search";
import { setProducts } from "./features/product/productSlice";
import useProductQuery from "./hooks/queries/useGetProductQuery";

function App() {
  const { useGetAllProductQuery } = useProductQuery();
  const { data: allProducts } = useGetAllProductQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allProducts) dispatch(setProducts(allProducts));
  }, [allProducts, dispatch]);

  return (
    <div className="App">
      <Search />
      <ListContainer />
    </div>
  );
}

export default App;
