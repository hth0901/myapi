import { createSlice } from "@reduxjs/toolkit";

const sukienSlice = createSlice({
  name: "sukien",
  initialState: {
    danhSachSuKien: [],
  },
  reducers: {
    truyvanDanhSachSuKien(state, action) {
      state.danhSachSuKien = action.payload.items;
    },
  },
});

export const sukienActions = sukienSlice.actions;

export default sukienSlice;
