import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CharacterData from "../components/CharacterData";
import { Character } from "../interfaces/CharacterInterface";
import { describe, expect, test, vi } from "vitest";
import selectedItemsReducer from "../slices/selectedItemsSlice";
import { charactersApi } from "../services/apis/charactersApi";

type TestStore = ReturnType<typeof createTestStore>;

const mockCharacters: Character[] = [
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

// Create a function to render the component with Redux provider
const renderWithProvider = (
  ui: React.ReactNode,
  { store }: { store: TestStore },
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

// Create a test-specific mock store setup
const createTestStore = () =>
  configureStore({
    reducer: {
      [charactersApi.reducerPath]: charactersApi.reducer,
      selectedItems: selectedItemsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
  });

describe("CharacterData Component", () => {
  test("renders the specified number of characters", () => {
    const store = createTestStore();

    renderWithProvider(
      <CharacterData
        data={mockCharacters}
        loading={false}
        onCharacterClick={mockOnCharacterClick}
      />,
      { store },
    );

    const characters = screen.getAllByRole("listitem");
    expect(characters.length).toBe(mockCharacters.length);
  });

  test("displays message when no characters are available", () => {
    const store = createTestStore();

    renderWithProvider(
      <CharacterData
        data={[]}
        loading={false}
        onCharacterClick={mockOnCharacterClick}
      />,
      { store },
    );

    const message = screen.getByText("No data available");
    expect(message).toBeInTheDocument();
  });

  test("calls onCharacterClick when a character is clicked", () => {
    const store = createTestStore();

    renderWithProvider(
      <CharacterData
        data={mockCharacters}
        loading={false}
        onCharacterClick={mockOnCharacterClick}
      />,
      { store },
    );

    screen.debug();
    const characterItem = screen.getAllByRole("listitem")[0];
    fireEvent.click(characterItem);

    expect(mockOnCharacterClick).toHaveBeenCalledWith(mockCharacters[0]);
  });

  test("displays loading indicator while fetching data", () => {
    const store = createTestStore();

    renderWithProvider(
      <CharacterData
        data={[]}
        loading={true}
        onCharacterClick={mockOnCharacterClick}
      />,
      { store },
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
