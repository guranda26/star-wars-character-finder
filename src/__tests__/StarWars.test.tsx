import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import StarWarsComponent from "../pages/StarWars";
import selectedItemsReducer from "../slices/selectedItemsSlice";
import { charactersApi } from "../services/apis/charactersApi";
import { ThemeProvider } from "../context/ThemeContext";
import { useTheme } from "../context/useTheme";

const createTestStore = () =>
  configureStore({
    reducer: {
      [charactersApi.reducerPath]: charactersApi.reducer,
      selectedItems: selectedItemsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
  });

const renderWithProvider = (
  ui: React.ReactNode,
  { store }: { store: ReturnType<typeof createTestStore> },
) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter> {ui}</MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe("StarWarsComponent", () => {
  test("renders without crashing", () => {
    const store = createTestStore();

    renderWithProvider(<StarWarsComponent />, { store });

    expect(
      screen.getByPlaceholderText(/search characters/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /throw error/i }),
    ).toBeInTheDocument();
  });

  test("renders ThemeToggleButton and toggles theme", () => {
    const store = createTestStore();

    renderWithProvider(<StarWarsComponent />, { store });

    const themeToggleButton = screen.getAllByTestId("theme-toggle-button");
    expect(themeToggleButton[0]).toBeInTheDocument();

    const { result } = renderHook(() => useTheme());
    expect(result.current.isDarkMode).toBe(false);

    fireEvent.click(themeToggleButton[1]);
    expect(result.current.isDarkMode).toBe(false);
  });
});
