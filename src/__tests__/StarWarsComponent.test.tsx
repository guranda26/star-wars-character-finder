import { render, screen, fireEvent } from "@testing-library/react";
import StarWarsComponent from "../pages/StarWars";
import { Character } from "../interfaces/CharacterInterface";
import { describe, expect, test, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

const mockCharacter: Character = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  homeworld: "Tatooine",
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: "",
  edited: "",
  url: "",
};

vi.mock("../utils", () => ({
  fetchData: vi.fn((searchQuery, currentPage, callback) => {
    callback({
      data: [mockCharacter],
      totalPages: 1,
    });
  }),
}));

describe("StarWarsComponent", () => {
  test("correctly displays the detailed card data", async () => {
    render(
      <BrowserRouter>
        <StarWarsComponent />
      </BrowserRouter>,
    );

    fireEvent.click(
      screen.getAllByRole("heading", { name: /luke skywalker/i })[0],
    );

    expect(await screen.findByTestId("character-name")).toHaveTextContent(
      mockCharacter.name,
    );
    expect(
      await screen.findByText(`Height: ${mockCharacter.height}`),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(`Mass: ${mockCharacter.mass}`),
    ).toBeInTheDocument();
  });

  test("hides the detailed card component when close button is clicked", async () => {
    render(
      <BrowserRouter>
        <StarWarsComponent />
      </BrowserRouter>,
    );

    fireEvent.click(
      screen.getAllByRole("heading", { name: /luke skywalker/i })[0],
    );

    fireEvent.click(screen.getByTestId("close-button"));

    expect(screen.queryByTestId("character-details")).not.toBeInTheDocument();
  });
});
