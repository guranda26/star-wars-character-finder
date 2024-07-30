import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer from "../slices/selectedItemsSlice";
import { RootState } from "../store";
import { describe, expect, test, vi } from "vitest";
import { Character } from "../interfaces/CharacterInterface";
import Flyout from "../components/Flyout";

interface PreloadedSelectedItemsState {
  selectedItems: RootState["selectedItems"];
}

const createTestStore = (preloadedState: PreloadedSelectedItemsState) =>
  configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
    preloadedState,
  });

describe("Flyout Component", () => {
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

  test("renders correct number of selected items", () => {
    // afterEach(cleanup);

    const preloadedState: PreloadedSelectedItemsState = {
      selectedItems: {
        items: {
          "1": mockCharacter,
          "2": { ...mockCharacter, name: "Darth Vader" },
        },
      },
    };
    const store = createTestStore(preloadedState);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    const heading = screen.getByRole("heading", {
      name: /2 item\(s\) selected/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test("download button triggers CSV download", () => {
    const preloadedState: PreloadedSelectedItemsState = {
      selectedItems: {
        items: {
          "1": mockCharacter,
        },
      },
    };
    const store = createTestStore(preloadedState);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    const mockUrl = "blob:http://localhost:3000/some-blob-url";
    const createObjectURLMock = vi.fn(() => mockUrl);
    const revokeObjectURLMock = vi.fn();

    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    const downloadButtons = screen.getAllByRole("button", {
      name: /download/i,
    });
    fireEvent.click(downloadButtons[0]);

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalledWith(mockUrl);

    createObjectURLMock.mockRestore();
    revokeObjectURLMock.mockRestore();
  });

  test("renders 'No items selected.' message when no items are selected", () => {
    const preloadedState: PreloadedSelectedItemsState = {
      selectedItems: {
        items: {},
      },
    };
    const store = createTestStore(preloadedState);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    const messages = screen.getAllByText(/no items selected./i);
    expect(messages[0]).toBeInTheDocument();
  });

  test("removes individual item when 'Remove' button is clicked", () => {
    const preloadedState: PreloadedSelectedItemsState = {
      selectedItems: {
        items: {
          "1": mockCharacter,
        },
      },
    };
    const store = createTestStore(preloadedState);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    fireEvent.click(removeButtons[0]);

    const state = store.getState().selectedItems.items;
    expect(Object.keys(state).length).toBe(1);
  });
});
