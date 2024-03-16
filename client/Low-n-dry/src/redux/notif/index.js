import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    updateNotif: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateNotif } = notifSlice.actions;

export default notifSlice.reducer;
