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
    resetOrder : (state) => {
        state.data = []
    }
  },
});

export const { updateOrder, resetOrder } = productSlice.actions;

export default productSlice.reducer;
