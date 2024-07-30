import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggleButton from "../components/ThemeToggle";
import { useTheme } from "../context/useTheme";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../context/useTheme");

describe("ThemeToggleButton", () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders light mode icon when isDarkMode is false", () => {
    (useTheme as jest.Mock).mockReturnValue({
      isDarkMode: false,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggleButton />);

    const lightModeIcon = screen.getByTestId("light-mode-icon");
    expect(lightModeIcon).toBeInTheDocument();
  });

  it("renders dark mode icon when isDarkMode is true", () => {
    (useTheme as jest.Mock).mockReturnValue({
      isDarkMode: true,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggleButton />);

    const darkModeIcon = screen.getByTestId("dark-mode-icon");
    expect(darkModeIcon).toBeInTheDocument();
  });

  it("toggles theme on button click", () => {
    (useTheme as jest.Mock).mockReturnValue({
      isDarkMode: false,
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggleButton />);

    const buttons = screen.getAllByTestId("theme-toggle-button");
    fireEvent.click(buttons[0]);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
