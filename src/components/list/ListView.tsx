import React from "react";
import { Product } from "../../api/productService";
import useProductQuery from "../../hooks/queries/useGetProductQuery";
import Spinner from "../ui/Spinner";
import List from "./List";

import "./ListView.styles.scss";

interface ListViewProps {
  pagePerProducts: Product[];
}

const ListView: React.FC<ListViewProps> = ({ pagePerProducts }) => {
  const { useGetAllProductQuery } = useProductQuery();
  const { isLoading } = useGetAllProductQuery();

  return (
    <div className="list-view">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {pagePerProducts.map((product) => {
            return (
              <List
                key={product.title}
                productTitle={product.title}
                productId={product.id}
                brand={product.brand}
                description={product.description}
                price={product.price}
                rating={product.rating}
                stock={product.stock}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ListView;
