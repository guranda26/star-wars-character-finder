import { configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer, {
  SelectedItemsState,
} from "./slices/selectedItemsSlice";

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

export interface RootState {
  selectedItems: SelectedItemsState;
}

export type AppDispatch = typeof store.dispatch;
export default store;
