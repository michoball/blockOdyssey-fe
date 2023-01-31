import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { selectTotalProductCount } from "../../features/product/productSlice";
import "./Pagination.styles.scss";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  setPage: Dispatch<SetStateAction<number>>;
  setPerPageHandler: (page: number) => void;
  page: number;
  perPage: number;
}

const PER_PAGE_INDEX = [10, 20, 50];

const Pagination: React.FC<PaginationProps> = ({
  setPage,
  page,
  setPerPageHandler,
  perPage,
}) => {
  const productsCount = useSelector(selectTotalProductCount);
  const numberOfButton = Math.ceil(productsCount / perPage);

  const pageNumbers = Array.from({ length: numberOfButton }, (_, i) => i + 1);

  const selectPerPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPageHandler(Number(e.target.value));
  };

  const pageNumberClickHandler = (pageNumber: number) => {
    setPage(pageNumber);
    // 입력된 pageNumber url에 넣기
    // ex) localhost:3000?여기에 search가 와야할듯/:pageNumber?pagePerRow=10
  };

  return (
    <div className="pagination-container">
      <div className="per-page">
        <label htmlFor="page ratio">
          <span>페이지 당 행 : </span>
        </label>
        <select onChange={selectPerPageHandler}>
          {PER_PAGE_INDEX.map((pageIndex) => (
            <option key={pageIndex} value={pageIndex}>
              {pageIndex}
            </option>
          ))}
        </select>
      </div>
      <div className="pagination-buttons">
        <button
          className="left-arrow"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          &#10094;
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
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * perPage >= productsCount}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
