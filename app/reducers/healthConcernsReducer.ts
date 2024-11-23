import { createSlice } from "@reduxjs/toolkit";

interface HealthConcernsState {
  healthConcerns: string[];
}

const initialState: HealthConcernsState = {
  healthConcerns: ["Sleep", "Immunity", "Stress", "Weight Loss"], 
};

const healthConcernsSlice = createSlice({
  name: "healthConcerns",
  initialState,
  reducers: {
    setHealthConcerns(state, action) {
      state.healthConcerns = action.payload; 
    },
    fetchHealthConcerns() {}, 
  },
});

export const { setHealthConcerns, fetchHealthConcerns } = healthConcernsSlice.actions;
export default healthConcernsSlice.reducer;
