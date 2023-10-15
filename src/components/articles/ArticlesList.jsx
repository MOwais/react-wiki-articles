import React, { useEffect, useState } from "react";
import Article from "./Article";
import Pagination from "../Pagination";
import "./ArticlesList.scss";

const ArticlesList = ({ pageSize, date, country }) => {
  const [initialArticles, setInitialArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let month = new Date(date).getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    const year = new Date(date).getFullYear();
    const day = new Date(date).getDate();
    const fetchArticles = async () => {
      const resp = await fetch(
        `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${country}/all-access/${year}/${month}/${day}`
      );
      const articles = await resp.json();
      setInitialArticles(articles.items[0].articles);
      setArticles(articles.items[0].articles);
    };
    fetchArticles();
  }, [date, country]);

  useEffect(() => {
    let data = [...initialArticles];
    let articlesRangeEnd = pageSize * currentPage;
    let articlesRangeStart = articlesRangeEnd - pageSize;
    data = data.slice(articlesRangeStart, articlesRangeEnd);
    setArticles(data);
  }, [currentPage, pageSize, country, initialArticles]);

  return (
    <>
      <div className="articles-list">
        {articles.map((article, index) => (
          <Article article={article} key={index} />
        ))}
      </div>
      <div className="articles-list__pagination">
        <Pagination
          pageSize={pageSize}
          totalCount={initialArticles.length}
          data={articles}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default ArticlesList;
