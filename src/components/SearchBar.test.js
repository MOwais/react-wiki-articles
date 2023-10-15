import { render, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";

const setPageSize = jest.fn();
const setDate = jest.fn();
const setCountry = jest.fn();

function searchBarRenderUtil(testProps) {
  const props = {
    setPageSize,
    setDate,
    setCountry,
    pageSize: 25,
    date: new Date("Sun Oct 14 2023"),
    country: "US",
  };

  const updatedProps = {
    ...props,
    ...testProps,
  };

  return render(<SearchBar {...updatedProps} />);
}
test("renders SearchBar", () => {
  const { getByText } = searchBarRenderUtil();
  expect(getByText("DATE", { exact: false })).toBeInTheDocument();
  expect(getByText("NUM RESULTS", { exact: false })).toBeInTheDocument();
  expect(getByText("COUNTRY", { exact: false })).toBeInTheDocument();
  expect(getByText("Search")).toBeInTheDocument();
});

test("selects date, calls setDate", async () => {
  const { getByText } = searchBarRenderUtil();
  userEvent.click(getByText("DATE", { exact: false }));
  await waitFor(() =>
    expect(getByText("15", { exact: false })).toBeInTheDocument()
  );
  userEvent.click(getByText("15"));
  expect(setDate).toBeCalled();
});

test("selects num results, calls setPageSize", async () => {
  const { getByText } = searchBarRenderUtil();
  userEvent.click(getByText("NUM RESULTS", { exact: false }));
  await waitFor(() => expect(getByText("200")).toBeInTheDocument());
  userEvent.click(getByText("200"));
  expect(setPageSize).toBeCalled();
});

test("selects country, calls country", async () => {
  const { getByText } = searchBarRenderUtil();
  userEvent.click(getByText("COUNTRY", { exact: false }));
  await waitFor(() => expect(getByText("Japan")).toBeInTheDocument());
  userEvent.click(getByText("Japan"));
  expect(setCountry).toBeCalled();
});
