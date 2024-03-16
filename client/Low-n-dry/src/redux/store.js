import { configureStore } from "@reduxjs/toolkit";
import product from "./product";
import order from "./order";

export const store = configureStore({
  reducer: {
    product: product,
    order: order
  },
});
