import { createReducer } from "@reduxjs/toolkit";
import { getProducts, register } from "./actions";
import { Demo } from "@/types";

const initalState: { products: Demo.Product[], user: Demo.User | null } = {
  products: [],
  user: null
};
export const appReducer = createReducer(initalState, (builder) => {
  builder
    .addCase(register.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(register.pending, (state, action) => {
      state.user = null
    })
    .addCase(register.rejected, (state, action) => {
      state.user = null
    })
})
