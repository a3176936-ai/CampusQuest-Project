import { createSlice } from "@reduxjs/toolkit";
import { initialQuests } from "../../data/mockData";

const STORAGE_KEY = "campusquest-react-quests";

function readInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { items: initialQuests, xp: 0 };
  } catch (error) {
    console.error("Could not load saved quests; using the sample quests.", error);
    return { items: initialQuests, xp: 0 };
  }
}

const questSlice = createSlice({
  name: "quests",
  initialState: readInitialState(),
  reducers: {
    questAdded(state, action) {
      state.items.unshift({ ...action.payload, id: `q-${Date.now()}`, completed: false });
    },
    questCompleted(state, action) {
      const quest = state.items.find((item) => item.id === action.payload);
      if (!quest || quest.completed) return;
      quest.completed = true;
      quest.completedAt = Date.now();
      state.xp += quest.xp;
    },
  },
});

export const { questAdded, questCompleted } = questSlice.actions;
export default questSlice.reducer;
