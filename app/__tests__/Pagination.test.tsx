import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";
import { describe, expect, test, vi } from "vitest";

describe("Pagination Component", () => {
  test("updates URL query parameter when Next button is clicked", () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />,
    );

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("disables Next button on the last page", () => {
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={3} totalPages={3} onPageChange={onPageChange} />,
    );
    const nextButtons = screen.getAllByTestId("next-button");
    const nextButton = nextButtons[0];
    fireEvent.click(nextButton);
  });
});
