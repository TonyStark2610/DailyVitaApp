import { createSlice } from "@reduxjs/toolkit";

interface DietState {
  selectedDiets: string[];
}

const initialState: DietState = {
  selectedDiets: [],
};

const dietSlice = createSlice({
  name: "diet",
  initialState,
  reducers: {
    addDiet(state, action) {
      if (!state.selectedDiets.includes(action.payload)) {
        state.selectedDiets.push(action.payload);
      }
    },
    removeDiet(state, action) {
      state.selectedDiets = state.selectedDiets.filter((diet) => diet !== action.payload);
    },
    resetDiets(state) {
      state.selectedDiets = [];
    },
  },
});

export const { addDiet, removeDiet, resetDiets } = dietSlice.actions;
export default dietSlice.reducer;
