import React from "react";
import { SearchCategory, SEARCH_CATEGORY } from "./Search";

import "./SearchDropdown.styles.scss";

interface SearchDropdownProps {
  onSelectOption: (categoryList: SearchCategory) => void;
  selectCondition: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  onSelectOption,
  selectCondition,
}) => {
  return (
    <div className="option-dropdown">
      {SEARCH_CATEGORY.map((categoryList) => (
        <div
          className={`option ${
            selectCondition === categoryList.condition && "focus"
          }`}
          key={categoryList.condition}
          onClick={() => onSelectOption(categoryList)}
        >
          {categoryList.name}
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
