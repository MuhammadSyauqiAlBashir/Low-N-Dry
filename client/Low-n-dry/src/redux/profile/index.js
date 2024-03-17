import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.data = action.payload;
    },
    resetProfile: (state) => {
      state.data = {};
    },
  },
});

export const { updateProfile, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
