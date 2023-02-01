import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import { selectTotalProductCount } from "../../features/product/productSlice";
import useUrlSearch from "../../hooks/useUrlSearch";
import PaginationItem from "./PaginationItem";

import "./Pagination.styles.scss";

interface PaginationProps {
  setPage: Dispatch<SetStateAction<number>>;
  setPerPageHandler: (page: number) => void;
  page: number;
  perPage: number;
}

const PER_PAGE_INDEX = [10, 20, 50] as const;

const Pagination: React.FC<PaginationProps> = ({
  setPage,
  page,
  setPerPageHandler,
  perPage,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { setSearchParams } = useUrlSearch();
  const productsCount = useSelector(selectTotalProductCount);
  const numberOfButton = Math.ceil(productsCount / perPage);
  const pageNumbers = Array.from({ length: numberOfButton }, (_, i) => i + 1);

  const selectPerPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const perPageValue = Number(e.target.value);
    setPerPageHandler(perPageValue);
  };

  const arrowButtonClickHandler = (arrowDirection: "left" | "right") => {
    if (arrowDirection === "left") {
      setPage((prev) => prev - 1);
      const newPage = page - 1;
      setSearchParams({ page: String(newPage) });
      return;
    }
    setPage((prev) => prev + 1);
    const newPage = page + 1;
    setSearchParams({ page: String(newPage) });
  };

  const pageNumberClickHandler = (pageNumber: number) => {
    setPage(pageNumber);
    setSearchParams({ page: String(pageNumber) });
  };

  // perPage 값이 바뀌면 select의 값도 바꿔줌
  // 처음 들어왔을 때 perPageRow query를 읽어들이기 위한 부분
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = String(perPage);
    }
  }, [perPage]);

  return (
    <div className="pagination-container">
      <div className="per-page">
        <label htmlFor="page ratio">
          <span>페이지 당 행 : </span>
        </label>
        <select onChange={selectPerPageHandler} ref={selectRef}>
          {PER_PAGE_INDEX.map((pageIndex) => (
            <option key={pageIndex} value={pageIndex}>
              {pageIndex}
            </option>
          ))}
        </select>
      </div>
      <nav className="pagination-buttons">
        <button
          className="left-arrow"
          onClick={arrowButtonClickHandler.bind(null, "left")}
          value="left"
          disabled={page === 1}
        >
          <span>&#10094;</span>
        </button>
        <ul>
          {pageNumbers.map((number) => (
            <PaginationItem
              key={number}
              pageNumber={number}
              pageClickHandler={() => pageNumberClickHandler(number)}
            />
          ))}
        </ul>
        <button
          className="right-arrow"
          value="right"
          onClick={arrowButtonClickHandler.bind(null, "right")}
          disabled={page * perPage >= productsCount}
        >
          <span>&#10095;</span>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
