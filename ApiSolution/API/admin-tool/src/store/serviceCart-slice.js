import { createSlice } from "@reduxjs/toolkit";

const serviceCartSlice = createSlice({
  name: "serviceCart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItemToCart(state, action) {},
    replaceCartItem(state, action) {},
    removeItemFromCart(state, action) {},
  },
});

export const serviceCartActions = serviceCartSlice.actions;

export default serviceCartSlice;
