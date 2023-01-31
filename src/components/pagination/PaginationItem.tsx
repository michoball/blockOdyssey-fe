import React from "react";
import "./PaginationItem.styles.scss";

interface PaginationItemProps {
  pageNumber: number;
  pageClickHandler: () => void;
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  pageNumber,
  pageClickHandler,
}) => {
  return (
    <li className="page-item" onClick={pageClickHandler}>
      <span>{pageNumber}</span>
    </li>
  );
};

export default PaginationItem;
