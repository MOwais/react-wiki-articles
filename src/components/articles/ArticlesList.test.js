import { render, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import ArticlesList from "./ArticlesList";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

const server = setupServer(
  rest.get(
    "https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/US/all-access/2023/09/14",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          items: [
            {
              articles: [
                {
                  article: "Main_Page",
                  project: "en.wikipedia",
                  views_ceil: 1832100,
                  rank: 1,
                },
                {
                  article: "Cookie_(informatique)",
                  project: "fr.wikipedia",
                  views_ceil: 1174400,
                  rank: 2,
                },
                {
                  article: "Special:Search",
                  project: "en.wikipedia",
                  views_ceil: 454300,
                  rank: 3,
                },
              ],
            },
          ],
        })
      );
    }
  )
);

function articlesListRenderUtil(testProps) {
  const props = {
    pageSize: 25,
    date: new Date("Sun Sept 14 2023"),
    country: "US",
  };

  const updatedProps = {
    ...props,
    ...testProps,
  };

  return render(<ArticlesList {...updatedProps} />);
}
test("renders ArticlesList", async () => {
  const { getByText } = articlesListRenderUtil();
  await waitFor(() => expect(getByText(/main_page/i)).toBeInTheDocument());
  expect(getByText("Cookie_(informatique)")).toBeInTheDocument();
  expect(getByText("Special:Search")).toBeInTheDocument();
});
