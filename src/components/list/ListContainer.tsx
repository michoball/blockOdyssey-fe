import React from "react";
import { products } from "../../dummy";
import Pagination from "../pagination/Pagination";
import List from "./List";
import "./ListContainer.styles.scss";

const ListContainer = () => {
  return (
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
        {products.map((product) => {
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
      </div>
      <Pagination />
    </section>
  );
};

export default ListContainer;
