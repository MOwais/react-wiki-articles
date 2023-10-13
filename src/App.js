import Header from "./components/Header";
import Articles from "./components/Articles";
import SearchBar from "./components/SearchBar";
import ArticlesList from "./components/ArticlesList";
import "./App.scss";
import { useState, useEffect } from "react";

function App() {
  const [date, setDate] = useState(new Date(Date.now() - 86400000));
  const [pageSize, setPageSize] = useState(100);
  return (
    <>
      <Header />
      <SearchBar
        setPageSize={setPageSize}
        setDate={setDate}
        pageSize={pageSize}
        date={date}
      />
      <ArticlesList pageSize={pageSize} date={date} />
    </>
  );
}

export default App;
