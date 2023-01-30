import React from "react";
import "./App.css";
import ListContainer from "./components/list/ListContainer";
import Search from "./components/search/Search";

function App() {
  return (
    <div className="App">
      <Search />
      <article className="searchedData">
        <p>검색된 데이터 : 100 건</p>
      </article>
      <ListContainer />
    </div>
  );
}

export default App;
