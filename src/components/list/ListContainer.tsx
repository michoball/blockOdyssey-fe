import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Product } from "../../api/productService";
import { selectProducts } from "../../features/product/productSlice";
import Pagination from "../pagination/Pagination";
import ListView from "./ListView";

import "./ListContainer.styles.scss";

const ListContainer = () => {
  const products = useSelector(selectProducts);

  const [setProducts, setSetProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageValue, setPerPageValue] = useState(10);

  const perPageHandler = (perPage: number) => {
    setPerPageValue(perPage);
    // 전체 데이터 수 / 페이지 당 행의 수 가 현재 페이지보다 크면 현재 페이지 값 조정
    const lastPageNumber = Math.ceil(setProducts.length / perPage);
    if (lastPageNumber < currentPage) {
      setCurrentPage(lastPageNumber);
    }
  };

  //현재 페이지에 보여질 product 배열
  const currentPageProducts = setProducts?.slice(
    currentPage * perPageValue - perPageValue,
    currentPage * perPageValue
  );

  useEffect(() => {
    if (products) setSetProducts(products);
  }, [products]);

  return (
    <>
      <article className="searched-data">
        <p>검색된 데이터 : {products.length} 건</p>
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
        <ListView pagePerProducts={currentPageProducts} />
        <Pagination
          setPage={setCurrentPage}
          page={currentPage}
          setPerPageHandler={perPageHandler}
          perPage={perPageValue}
        />
      </section>
    </>
  );
};

export default ListContainer;
