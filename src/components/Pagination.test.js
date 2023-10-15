import { render, waitFor } from "@testing-library/react";
import Pagination from "./Pagination";
import userEvent from "@testing-library/user-event";

const ARTICLES = [
  {
    article: "Main_Page",
    project: "en.wikipedia",
    rank: 1,
    views_ceil: 1,
  },
  {
    article: "Cookie_(informatique)",
    project: "fr.wikipedia",
    rank: 2,
    views_ceil: 2,
  },
  {
    article: "Gaza_Strip",
    project: "fr.wikipedia",
    rank: 3,
    views_ceil: 1000000,
  },
];

const setCurrentPage = jest.fn();
function paginationRenderUtil(testProps) {
  const props = {
    pageSize: 25,
    totalCount: 100,
    data: ARTICLES,
    currentPage: 1,
    setCurrentPage,
  };

  const updatedProps = {
    ...props,
    ...testProps,
  };

  return render(<Pagination {...updatedProps} />);
}
test("renders Pagination", () => {
  const { container } = paginationRenderUtil();
  const pagination = container.firstChild;
  expect(pagination).toHaveClass("pagination");
});

test("sets current page number, calls setCurrentPage for previous button", async () => {
  const { container } = paginationRenderUtil({ currentPage: 2 });
  const pagination = container.firstChild;
  const prevButton = pagination.firstChild;
  userEvent.click(prevButton);
  await waitFor(() => expect(setCurrentPage).toBeCalled());
});

test("sets current page number, calls setCurrentPage for next button", async () => {
  const { container } = paginationRenderUtil({ currentPage: 1 });
  const pagination = container.firstChild;
  const nextButton = pagination.lastChild;
  userEvent.click(nextButton);
  await waitFor(() => expect(setCurrentPage).toBeCalled());
});

test("sets current page number, calls setCurrentPage for specific page", async () => {
  paginationRenderUtil({ currentPage: 2 });
  const pageButton = document.getElementsByClassName("pagination__button")[0];
  userEvent.click(pageButton);
  await waitFor(() => expect(setCurrentPage).toBeCalled());
});

test("does not call setCurrentPage when clicking previous button on first page", async () => {
  const { container } = paginationRenderUtil({ currentPage: 1 });
  const pagination = container.firstChild;
  const prevButton = pagination.firstChild;
  userEvent.click(prevButton);
  await waitFor(() => expect(setCurrentPage).not.toBeCalled());
});

test("does not call setCurrentPage when clicking next button on last page", async () => {
  const { container } = paginationRenderUtil({ currentPage: 4 });
  const pagination = container.firstChild;
  const nextButton = pagination.lastChild;
  userEvent.click(nextButton);
  await waitFor(() => expect(setCurrentPage).not.toBeCalled());
});
