import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("units") || "metric",
};

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    setUnits: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("units", state.value);
    },
    toggleUnits: (state) => {
      state.value = state.value === "metric" ? "imperial" : "metric";
      localStorage.setItem("units", state.value);
    },
  },
});

export const { setUnits, toggleUnits } = unitsSlice.actions;
export const selectUnits = (state) => state.units.value;
export default unitsSlice.reducer;
