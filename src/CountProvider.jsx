"use client";

import { Provider } from "react-redux";
import { counterStore } from "./store/counterStore";

export const CountProvider = ({ children }) => {
  return <Provider store={counterStore}>{children}</Provider>;
};
