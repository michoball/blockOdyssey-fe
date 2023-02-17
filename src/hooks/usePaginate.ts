import { useMemo, useState } from "react";
import { Product } from "../api/productService";

// useUrlSearch hook부분은 빼야할 듯
const usePaginate = (products: Product[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageValue, setPerPageValue] = useState(10);

  // products 리스트 parameter로 넘기기
  const perPageValueHandler = (perPage: number) => {
    // 전체 데이터 수 / 페이지 당 행의 수 가 현재 페이지보다 크면 현재 페이지 값 조정
    let lastPageNumber = Math.ceil(products.length / perPage);
    if (lastPageNumber < currentPage) {
      const beforFirstProductNum = currentPage * perPageValue - perPageValue;
      const afterFirstProductNum = lastPageNumber * perPage - perPage;
      // 현재 페이지 제일 첫번째 값이 변경되는 페이지에 없을 경우
      if (beforFirstProductNum < afterFirstProductNum) {
        lastPageNumber--;
      }
      return lastPageNumber;
    }
  };

  const currentPageProducts = useMemo(
    () =>
      products?.slice(
        currentPage * perPageValue - perPageValue,
        currentPage * perPageValue
      ),
    [currentPage, perPageValue, products]
  );

  return {
    currentPage,
    perPageValue,
    setCurrentPage,
    setPerPageValue,
    perPageValueHandler,
    currentPageProducts,
  };
};

export default usePaginate;
