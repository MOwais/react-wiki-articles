import React, { useEffect, useState } from "react";
import Article from "./Article";
import "./ArticlesList.scss";

const ArticlesList = ({ pageSize, date }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const resp = await fetch(
        `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2015/10/10`
      );
      const articles = await resp.json();
      setArticles(articles.items[0].articles);
    };
    fetchArticles();
  }, [date, pageSize]);

  return (
    <div className="articles-list">
      {articles.map((article, index) => (
        <Article article={article} key={index} />
      ))}
    </div>
  );
};

export default ArticlesList;
