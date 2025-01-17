import React from "react";
import { formatNumberWithCommas } from "../../utils";
import "./Article.scss";

const Article = ({ article }) => {
  return (
    <div className="article">
      <div className="article__rank">{article.rank}</div>
      <div className="article__article-name">{article.article}</div>
      <div className="article__views">{`${formatNumberWithCommas(
        article.views_ceil
      )} ${article.views_ceil === 1 ? "view" : "views"}`}</div>
    </div>
  );
};

export default Article;
