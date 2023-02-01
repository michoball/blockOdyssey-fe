import React, { useEffect, useRef } from "react";
import "./PaginationItem.styles.scss";

interface PaginationItemProps {
  pageNumber: number;
  currentPage: number;
  pageClickHandler: () => void;
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  pageNumber,
  currentPage,
  pageClickHandler,
}) => {
  const pageNumberRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (pageNumberRef.current) {
      if (pageNumberRef.current.value === currentPage) {
        pageNumberRef.current.classList.add("focus");
      } else {
        pageNumberRef.current.classList.remove("focus");
      }
    }
  }, [currentPage]);

  return (
    <li
      className="page-item"
      onClick={pageClickHandler}
      value={pageNumber}
      ref={pageNumberRef}
    >
      <span>{pageNumber}</span>
    </li>
  );
};

export default PaginationItem;
