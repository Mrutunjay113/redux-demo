import countReducer from "@/features/count/countSlice";
import { configureStore } from "@reduxjs/toolkit";

export const counterStore = configureStore({
  reducer: {
    count: countReducer,
  },
});
