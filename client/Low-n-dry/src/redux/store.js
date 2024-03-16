import { configureStore } from "@reduxjs/toolkit";
import product from "./product";
import order from "./order";
import province from "./province";
import profile from "./profile";
import notif from "./notif";

export const store = configureStore({
  reducer: {
    product: product,
    order: order,
    province: province,
    profile : profile,
    notif : notif
  },
});
