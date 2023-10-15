import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ArticlesList from "./components/articles/ArticlesList";
import { useState } from "react";
import "./App.scss";

function App() {
  const [date, setDate] = useState(new Date(Date.now() - 86400000));
  const [pageSize, setPageSize] = useState(100);
  const [country, setCountry] = useState("US");
  return (
    <>
      <Header />
      <SearchBar
        setPageSize={setPageSize}
        setDate={setDate}
        setCountry={setCountry}
        pageSize={pageSize}
        date={date}
        country={country}
      />
      <ArticlesList pageSize={pageSize} date={date} country={country} />
    </>
  );
}

export default App;
