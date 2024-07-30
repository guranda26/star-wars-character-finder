import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { describe, expect, test } from "vitest";

describe("NotFound Component", () => {
  test("renders the NotFound component with correct text", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", {
      name: /404 - Page Not Found/i,
    });
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(
      /Sorry, the page you are looking for does not exist./i,
    );
    expect(paragraph).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Go back to Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
