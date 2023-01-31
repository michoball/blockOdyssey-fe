import React from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../features/product/productSlice";
// import { products } from "../../dummy";
import useProductQuery from "../../hooks/queries/useGetProductQuery";
import Pagination from "../pagination/Pagination";
import List from "./List";
import "./ListContainer.styles.scss";

const ListContainer = () => {
  const { useGetAllProductQuery } = useProductQuery();
  const { isLoading } = useGetAllProductQuery();
  const { total } = useSelector(selectProducts);

  return (
    <>
      <article className="searched-data">
        <p>검색된 데이터 : {total} 건</p>
      </article>
      <section className="List-container">
        <div className="list-header">
          <div className="header-block">
            <span>상품번호</span>
          </div>
          <div className="header-block">
            <span>상품명</span>
          </div>
          <div className="header-block brand">
            <span>브랜드</span>
          </div>
          <div className="header-block desc">
            <span>상품내용</span>
          </div>
          <div className="header-block">
            <span>가격</span>
          </div>
          <div className="header-block">
            <span>평점</span>
          </div>
          <div className="header-block">
            <span>재고</span>
          </div>
        </div>

        <div className="list-view">
          {isLoading ? (
            <li>loading...</li>
          ) : (
            <>
              <div>data fetched</div>
              {/* {allProducts.products.map((product) => {
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
            })} */}
            </>
          )}
        </div>
        <Pagination />
      </section>
    </>
  );
};

export default ListContainer;
