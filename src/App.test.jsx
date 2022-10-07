import { describe, expect, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "./App";

afterEach(cleanup);

it("should take a snapshot", () => {
  const { asFragment } = render(<App />);
  
  expect(asFragment(<App />)).toMatchSnapshot();
});
