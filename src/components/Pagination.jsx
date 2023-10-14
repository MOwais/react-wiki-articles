import React from "react";
import "./Pagination.scss";

const Pagination = ({
  pageSize,
  totalCount,
  currentPage,
  setCurrentPage,
  data,
}) => {
  const pagesLength = totalCount / pageSize + 1;

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i < pagesLength; i++) {
      pageNumbers.push(
        <div
          onClick={() => setCurrentPage(i)}
          className={
            currentPage === i
              ? "pagination__page-number pagination__page-number--selected"
              : "pagination__page-number"
          }
        >
          {i}
        </div>
      );
    }
    return pageNumbers;
  };
  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={(e) => {
          if (currentPage !== 1) setCurrentPage(currentPage - 1);
        }}
      >
        <img
          src={require(currentPage === 1
            ? "../assets/left_arrow_disabled.png"
            : "../assets/left_arrow.png")}
        />
      </button>
      {getPageNumbers()}
      <button
        className="pagination__button"
        onClick={(e) => {
          if (currentPage !== pagesLength - 1) setCurrentPage(currentPage + 1);
        }}
      >
        <img
          src={require(currentPage === pagesLength - 1
            ? "../assets/right_arrow_disabled.png"
            : "../assets/right_arrow.png")}
        />
      </button>
    </div>
  );
};

export default Pagination;
