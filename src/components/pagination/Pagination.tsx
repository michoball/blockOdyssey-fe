import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
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
  const { setSearchParams } = useUrlSearch();
  const selectRef = useRef<HTMLSelectElement>(null);
  const productsCount = useSelector(selectTotalProductCount);
  const numberOfButton = Math.ceil(productsCount / perPage);
  const pageNumbers = useMemo(
    () => Array.from({ length: numberOfButton }, (_, i) => i + 1),
    [numberOfButton]
  );
  const [arrayOfButton, setArrayOfButton] = useState<(number | string)[]>([]);

  const selectPerPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const perPageValue = Number(e.target.value);
    setPerPageHandler(perPageValue);
  };

  // 화살표 방향 클릴 이벤트
  const arrowButtonClickHandler = (arrowDirection: "left" | "right") => {
    if (arrowDirection === "left") {
      setPage((prev) => prev - 1);
      setSearchParams({ page: String(page - 1) });
    } else {
      setPage((prev) => prev + 1);
      setSearchParams({ page: String(page + 1) });
    }
  };

  const pageNumberClickHandler = (pageNumber: number) => {
    setPage(pageNumber);
    setSearchParams({ page: String(pageNumber) });
  };

  // 처음 들어왔을 때 perPageRow query를 읽어들이기 위한 부분
  useEffect(() => {
    if (selectRef.current) {
      // perPage 값이 바뀌면 select의 값도 바꿔줌
      selectRef.current.value = String(perPage);
    }
  }, [perPage]);

  // pagination button에 ... 효과 넣어주기
  useEffect(() => {
    // pageNumbers 길이가 다음보다 작으면 밑의 작업이 의미없다고 판단하여 pageNumbers값을 넣고 리턴
    if (pageNumbers.length < 8) return setArrayOfButton(pageNumbers);

    let tempNumberOfPages: (number | string)[] = [...pageNumbers];
    // 현재 page에 따른 pagination button 값
    if (page <= 4) {
      tempNumberOfPages = [
        ...pageNumbers.slice(0, 5),
        "...",
        pageNumbers[pageNumbers.length - 1],
      ];
    } else if (pageNumbers.length - 3 <= page) {
      tempNumberOfPages = [1, "...", ...pageNumbers.slice(-5)];
    } else {
      tempNumberOfPages = [
        1,
        "...",
        ...pageNumbers.slice(page - 2, page + 1),
        "...",
        pageNumbers[pageNumbers.length - 1],
      ];
    }

    setArrayOfButton(tempNumberOfPages);
  }, [page, pageNumbers]);

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
          {arrayOfButton.length > 0 &&
            arrayOfButton.map((button, idx) => {
              if (typeof button === "number") {
                return (
                  <PaginationItem
                    key={button}
                    pageNumber={button}
                    currentPage={page}
                    pageClickHandler={() => pageNumberClickHandler(button)}
                  />
                );
              }
              return (
                <li className="three-dot" key={`${button}${idx}`}>
                  <span>{button}</span>
                </li>
              );
            })}
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
