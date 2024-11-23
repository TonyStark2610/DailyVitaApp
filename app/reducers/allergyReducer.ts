import { createSlice } from "@reduxjs/toolkit";

interface AllergyState {
  selectedAllergies: string[]; 
}

const initialState: AllergyState = {
  selectedAllergies: [],
};

const allergySlice = createSlice({
  name: "allergy",
  initialState,
  reducers: {
    addAllergy(state, action) {
      if (!state.selectedAllergies.includes(action.payload)) {
        state.selectedAllergies.push(action.payload);
      }
    },
    removeAllergy(state, action) {
      state.selectedAllergies = state.selectedAllergies.filter(
        (allergy) => allergy !== action.payload
      );
    },
    resetAllergies(state) {
      state.selectedAllergies = [];
    },
  },
});

export const { addAllergy, removeAllergy, resetAllergies } = allergySlice.actions;
export default allergySlice.reducer;
