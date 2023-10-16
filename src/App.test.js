import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  render(<App />);
  const linkElement = screen.getByText(/top wikipedia articles/i);
  expect(linkElement).toBeInTheDocument();
});
