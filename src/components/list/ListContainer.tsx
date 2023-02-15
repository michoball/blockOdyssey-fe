import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSearchedProducts } from "../../features/product/productSlice";
import Pagination from "../pagination/Pagination";
import ListView from "./ListView";
import useUrlSearch from "../../hooks/useUrlSearch";

import "./ListContainer.styles.scss";

const ListContainer = () => {
  const products = useSelector(selectSearchedProducts);
  const { setSearchParams, getSearchParams } = useUrlSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageValue, setPerPageValue] = useState(10);

  const perPageHandler = (perPage: number) => {
    // 전체 데이터 수 / 페이지 당 행의 수 가 현재 페이지보다 크면 현재 페이지 값 조정
    let lastPageNumber = Math.ceil(products.length / perPage);
    if (lastPageNumber < currentPage) {
      const beforFirstProductNum = currentPage * perPageValue - perPageValue;
      const afterFirstProductNum = lastPageNumber * perPage - perPage;
      // 현재 페이지 제일 첫번째 값이 변경되는 페이지에 없을 경우
      if (beforFirstProductNum < afterFirstProductNum) {
        lastPageNumber--;
      }
      setCurrentPage(lastPageNumber);
      setSearchParams({ page: String(lastPageNumber) });
    }

    setPerPageValue(perPage);
    setSearchParams({ pagePerRow: String(perPage) });
  };

  //현재 페이지에 보여질 product 배열
  const currentPageProducts = products?.slice(
    currentPage * perPageValue - perPageValue,
    currentPage * perPageValue
  );

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
  }, [setSearchParams, getSearchParams]);

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
