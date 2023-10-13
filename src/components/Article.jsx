import React from "react";
import "./Article.scss";

const Article = ({ article }) => {
  return (
    <div className="article">
      <div className="article__rank">{article.rank}</div>
      <div className="article__article-name">{article.article}</div>
      <div className="article__views">{`${article.views} ${
        article.views === 1 ? "view" : "views"
      }`}</div>
    </div>
  );
};

export default Article;
