import { createSlice } from "@reduxjs/toolkit";

const authenSlice = createSlice({
  name: "authen",
  initialState: {
    isLoggedIn: false,
    userInfo: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userInfo = { ...action.payload.userInfo };
    },
    logout(state, action) {
      localStorage.removeItem("loginInfo");
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
});

export const authenActions = authenSlice.actions;

export default authenSlice;
