import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  searchProducts,
  selectProducts,
} from "../../features/product/productSlice";
import useUrlSearch from "../../hooks/useUrlSearch";
import "./Search.styles.scss";
import SearchDropdown from "./SearchDropdown";

export const SEARCH_CONDITION = {
  total: "total",
  title: "title",
  brand: "brand",
  description: "description",
};

export interface SearchCategory {
  condition: string;
  name: string;
}

export const SEARCH_CATEGORY = [
  { condition: SEARCH_CONDITION.total, name: "전체" },
  { condition: SEARCH_CONDITION.title, name: "상품명" },
  { condition: SEARCH_CONDITION.brand, name: "브랜드" },
  { condition: SEARCH_CONDITION.description, name: "상품내용" },
];

const Search = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(selectProducts);
  const { setSearchParams, getSearchParams } = useUrlSearch();
  const [isDropDown, setIsDropDown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SearchCategory>({
    condition: "total",
    name: "전체",
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectOptionHandler = (categoryList: SearchCategory) => {
    setSelectedOption(categoryList);
    setIsDropDown(false);
  };

  const productSearchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInputRef.current) return;
    const searchTerm = searchInputRef.current.value;
    const searchCategory = selectedOption.condition;

    const encodedSearchTerm = encodeURIComponent(searchTerm);
    setSearchParams({
      category: searchCategory,
      searchTerm: encodedSearchTerm,
    });

    dispatch(searchProducts({ condition: searchCategory, searchTerm }));
  };

  const toggleDropdownHandler = () => {
    setIsDropDown(!isDropDown);
  };

  useEffect(() => {
    if (products) {
      const categoryParam = getSearchParams("category");
      const searchTermParam = getSearchParams("searchTerm");
      if (categoryParam && searchTermParam) {
        if (!searchInputRef.current) return;
        searchInputRef.current.value = searchTermParam;
        const name = Object.values(SEARCH_CATEGORY).filter(
          (value) => value.condition === categoryParam
        )[0].name;
        setSelectedOption({ condition: categoryParam, name });

        dispatch(
          searchProducts({
            condition: categoryParam,
            searchTerm: searchTermParam,
          })
        );
      }
    }
  }, [products, dispatch, getSearchParams]);

  return (
    <div className="search-container">
      <header>
        <p>상품검색</p>
      </header>
      <article className="search-part">
        <p>검색</p>
        <form className="search-form" onSubmit={productSearchHandler}>
          <div className="current-option" onClick={toggleDropdownHandler}>
            <span className="category">{selectedOption.name} </span>
            {isDropDown ? (
              <span className="arrow">&#5169;</span>
            ) : (
              <span className="arrow">&#5167;</span>
            )}
          </div>
          {isDropDown && (
            <SearchDropdown
              onSelectOption={selectOptionHandler}
              selectCondition={selectedOption.condition}
            />
          )}
          <input type="text" title="search term" ref={searchInputRef} />
          <button type="submit">조회</button>
        </form>
      </article>
    </div>
  );
};

export default Search;
