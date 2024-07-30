import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import React from "react";
import { ThemeProvider, ThemeContext } from "../context/ThemeContext";

const TestComponent: React.FC = () => {
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
  return (
    <div>
      <p data-testid="theme-status">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeProvider", () => {
  it("should toggle theme between dark and light mode", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    // Check initial theme status
    expect(screen.getByTestId("theme-status")).toHaveTextContent("Light Mode");

    // Toggle theme
    fireEvent.click(screen.getByText("Toggle Theme"));

    // Check theme status after toggle
    expect(screen.getByTestId("theme-status")).toHaveTextContent("Dark Mode");
  });
});
