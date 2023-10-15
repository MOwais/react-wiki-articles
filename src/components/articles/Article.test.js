import { render, screen } from "@testing-library/react";
import Article from "./Article";

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
test("renders Article", () => {
  render(<Article article={ARTICLES[0]} />);
  const articleName = screen.getByText(/main_page/i);
  expect(articleName).toBeInTheDocument();
});

test("renders view when only 1 view", () => {
  render(<Article article={ARTICLES[0]} />);
  const articleName = screen.getByText(/1 view/i);
  expect(articleName).toBeInTheDocument();
});

test("renders views when more than 1 view", () => {
  render(<Article article={ARTICLES[1]} />);
  const articleName = screen.getByText(/2 views/i);
  expect(articleName).toBeInTheDocument();
});

test("formats view count with commas", () => {
  render(<Article article={ARTICLES[2]} />);
  const articleName = screen.getByText(/1,000,000 views/i);
  expect(articleName).toBeInTheDocument();
});
