import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const provinceSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProvince: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateProvince } = provinceSlice.actions;

export default provinceSlice.reducer;
