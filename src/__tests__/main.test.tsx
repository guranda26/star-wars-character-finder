import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import App from "../App";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const appElement = screen.getByTestId("app-container");
    expect(appElement).toBeInTheDocument();
  });

  // Other tests for app interactions
});
