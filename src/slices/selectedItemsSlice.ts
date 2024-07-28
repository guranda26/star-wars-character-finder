import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../interfaces/CharacterInterface";

interface SelectedItemsState {
  items: { [key: string]: Character };
}

const initialState: SelectedItemsState = {
  items: {},
};

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<Character>) {
      const item = action.payload;
      state.items[item.name] = item;
    },
    unselectItem(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    setItems(state, action: PayloadAction<{ [key: string]: Character }>) {
      state.items = action.payload;
    },
  },
});

export const { selectItem, unselectItem, setItems } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
