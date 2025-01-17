import React, { useEffect, useState } from "react";
import Article from "./Article";
import Pagination from "../Pagination";
import "./ArticlesList.scss";

const ArticlesList = ({ pageSize, date, country }) => {
  const [initialArticles, setInitialArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /*
     * /GET - top 1000 WikiPedia articles ranked by view
     * @{country}
     * @{year}
     * @{month}
     * @{day}
     */
    let month = new Date(date).getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    const year = new Date(date).getFullYear();
    const day = new Date(date).getDate();
    const fetchArticles = async () => {
      setIsLoading(true);
      const resp = await fetch(
        `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${country}/all-access/${year}/${month}/${day}`
      );
      if (!resp.ok) {
        alert("Something went wrong. Please try again later");
        setIsLoading(false);
        return;
      }
      const articles = await resp.json();
      setInitialArticles(articles.items[0].articles);
      setArticles(articles.items[0].articles);
      setIsLoading(false);
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
      {articles.length === 0 && (
        <div className="articles-list">No results found.</div>
      )}
      {isLoading && <div className="articles-list">Loading...</div>}
      {articles.length >= 1 && (
        <div className="articles-list">
          {articles.map((article, index) => (
            <Article article={article} key={index} />
          ))}
        </div>
      )}
      {articles.length >= 1 && (
        <div className="articles-list__pagination">
          <Pagination
            pageSize={pageSize}
            totalCount={initialArticles.length}
            data={articles}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default ArticlesList;
