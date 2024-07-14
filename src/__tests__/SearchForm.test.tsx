import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "../components/SearchForm";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("SearchForm Component", () => {
  const mockOnSearchChange = vi.fn();
  const mockOnSearchSubmit = vi.fn();
  const mockThrowError = vi.fn();

  beforeEach(() => {
    render(
      <SearchForm
        searchQuery=""
        onSearchChange={mockOnSearchChange}
        onSearchSubmit={mockOnSearchSubmit}
        throwError={mockThrowError}
      />,
    );
  });

  test("calls onSearchSubmit when the form is submitted", () => {
    render(
      <SearchForm
        searchQuery=""
        onSearchChange={vi.fn()}
        onSearchSubmit={mockOnSearchSubmit}
        throwError={vi.fn()}
      />,
    );

    const form = screen.getAllByTestId("search-form");
    fireEvent.submit(form[0]);

    expect(mockOnSearchSubmit).toHaveBeenCalled();
  });

  test("resets error state when Reload Page button is clicked", () => {
    render(
      <SearchForm
        searchQuery=""
        onSearchChange={vi.fn()}
        onSearchSubmit={vi.fn()}
        throwError={vi.fn()}
      />,
    );

    const throwErrorButtons = screen.getAllByText("Throw Error");
    fireEvent.click(throwErrorButtons[0]);

    const reloadButtons = screen.getAllByRole("button", {
      name: /Reload Page/i,
    });
    fireEvent.click(reloadButtons[0]);

    expect(screen.queryByText("Something went wrong.")).not.toBeInTheDocument();
  });
});
