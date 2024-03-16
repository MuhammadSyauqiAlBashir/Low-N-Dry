import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateProduct } = productSlice.actions;

export default productSlice.reducer;
