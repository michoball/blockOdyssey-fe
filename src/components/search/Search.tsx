import React from "react";
import "./Search.styles.scss";

const Search = () => {
  return (
    <div className="search-container">
      <header>
        <p>상품검색</p>
      </header>
      <article className="search-part">
        <p>검색</p>
        <div className="search-function">
          <select>
            <option value="total">전체</option>
            <option value="productName">상품명</option>
            <option value="brand">브랜드</option>
            <option value="productDesc">상품내용</option>
          </select>
          <input type="text" title="search term" />
          <button type="submit">조회</button>
        </div>
      </article>
    </div>
  );
};

export default Search;
