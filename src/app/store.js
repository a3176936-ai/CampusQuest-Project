import { configureStore } from "@reduxjs/toolkit";
import questReducer from "../features/quests/questSlice";

export const store = configureStore({
  reducer: { quests: questReducer },
});

store.subscribe(() => {
  try {
    localStorage.setItem("campusquest-react-quests", JSON.stringify(store.getState().quests));
  } catch (error) {
    console.error("Could not persist quest progress in this browser.", error);
  }
});
