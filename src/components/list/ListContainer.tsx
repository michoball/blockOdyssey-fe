import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSearchedProducts } from "../../features/product/productSlice";
import Pagination from "../pagination/Pagination";
import ListView from "./ListView";
import useUrlSearch from "../../hooks/useUrlSearch";

import "./ListContainer.styles.scss";
import usePaginate from "../../hooks/usePaginate";

const ListContainer = () => {
  const products = useSelector(selectSearchedProducts);
  const { setSearchParams, getSearchParams } = useUrlSearch();
  const {
    currentPage,
    perPageValue,
    setCurrentPage,
    setPerPageValue,
    perPageValueHandler,
    currentPageProducts,
  } = usePaginate(products);

  const perPageHandler = (perPage: number) => {
    const lastPageNumber = perPageValueHandler(perPage);
    if (typeof lastPageNumber === "number") {
      setSearchParams({ page: String(lastPageNumber) });
      setCurrentPage(() => lastPageNumber);
    }
    setPerPageValue(perPage);
    setSearchParams({ pagePerRow: String(perPage) });
  };

  // 처음 페이지 진입 시 url search params 확인
  useEffect(() => {
    if (!getSearchParams("page")) {
      setSearchParams({ page: "1", pagePerRow: "10" });
      return;
    }
    // searchParams에 searchTerm이 있는지 확인하고 있으면 searchTerm의 값으로 search action 실행
    // 없으면 밑에처럼 진행
    const paramsPage = Number(getSearchParams("page"));
    const paramsPerPageRow = Number(getSearchParams("pagePerRow"));
    setCurrentPage(paramsPage);
    setPerPageValue(paramsPerPageRow);
  }, [setSearchParams, getSearchParams, setCurrentPage, setPerPageValue]);

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
