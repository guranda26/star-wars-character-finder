import { render, screen, fireEvent } from "@testing-library/react";
import CharacterData from "../components/CharacterData";
import { Character } from "../interfaces/CharacterInterface";
import { describe, expect, test, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer from "../slices/selectedItemsSlice";

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

export const mockCharacters: Character[] = [
  {
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
  },
  {
    name: "Darth Vader",
    height: "202",
    mass: "136",
    hair_color: "none",
    skin_color: "white",
    eye_color: "yellow",
    birth_year: "41.9BBY",
    gender: "male",
    homeworld: "Tatooine",
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: "",
    edited: "",
    url: "",
  },
];

const mockOnCharacterClick = vi.fn();

describe("CharacterData Component", () => {
  test("renders the specified number of characters", () => {
    render(
      <Provider store={store}>
        <CharacterData
          data={mockCharacters}
          loading={false}
          onCharacterClick={mockOnCharacterClick}
        />
      </Provider>,
    );

    const characters = screen.getAllByRole("listitem");
    expect(characters.length).toBe(mockCharacters.length);
  });

  test("displays message when no characters are available", () => {
    render(
      <Provider store={store}>
        <CharacterData
          data={[]}
          loading={false}
          onCharacterClick={mockOnCharacterClick}
        />
      </Provider>,
    );

    const message = screen.getByText("No data available");
    expect(message).toBeInTheDocument();
  });

  test("calls onCharacterClick when a character is clicked", () => {
    render(
      <Provider store={store}>
        <CharacterData
          data={mockCharacters}
          loading={false}
          onCharacterClick={mockOnCharacterClick}
        />
      </Provider>,
    );

    screen.debug();
    const characterItem = screen.getAllByRole("listitem")[0];
    fireEvent.click(characterItem);

    expect(mockOnCharacterClick).toHaveBeenCalledWith(mockCharacters[0]);
  });

  test("displays loading indicator while fetching data", () => {
    render(
      <Provider store={store}>
        <CharacterData
          data={[]}
          loading={true}
          onCharacterClick={mockOnCharacterClick}
        />
      </Provider>,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
