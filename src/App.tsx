import React from "react";
import "./App.styles.scss";
import ListContainer from "./components/list/ListContainer";
import Search from "./components/search/Search";

function App() {
  return (
    <div className="App">
      <Search />
      <article className="searched-data">
        <p>검색된 데이터 : 100 건</p>
      </article>
      <ListContainer />
    </div>
  );
}

export default App;
