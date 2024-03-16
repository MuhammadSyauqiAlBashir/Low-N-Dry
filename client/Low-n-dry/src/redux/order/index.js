import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const productSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateOrder } = productSlice.actions;

export default productSlice.reducer;
