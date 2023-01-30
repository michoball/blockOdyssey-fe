import React from "react";
import "./Pagination.styles.scss";

const Pagination = () => {
  return (
    <div className="pagination-container">
      <div className="per-page">
        <label htmlFor="page ratio">
          <span>페이지 당 행: </span>
        </label>
        <select>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
      <div className="pagination-buttons">
        <button>&#10094;</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button> &#10095;</button>
      </div>
    </div>
  );
};

export default Pagination;
