import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    adultQuantity: 0,
    childrenQuantity: 0,
    totalPrice: 0,
    placeObj: null,
  },
  reducers: {
    resetTicket (state, action) {
      state.adultQuantity = 0;
      state.childrenQuantity = 0;
      state.totalPrice = 0;
      state.placeObj = null;
    },
    selectPlace(state, action) {
      //   state.placeId = action.payload;
      state.placeObj = {
        id: action.payload.id,
        title: action.payload.title,
        imageID: action.payload.imageID,
        imageUrl: action.payload.imageUrl,
        adultPrice: action.payload.adultPrice,
        childrenPrice: action.payload.childrenPrice,
      };
      state.totalPrice =
        state.adultQuantity * state.placeObj.adultPrice +
        state.childrenQuantity * state.placeObj.childrenPrice;
    },
    changeAdultQuantity(state, action) {
      state.adultQuantity = state.adultQuantity + action.payload;
      state.totalPrice =
        state.adultQuantity * state.placeObj.adultPrice +
        state.childrenQuantity * state.placeObj.childrenPrice;
    },
    updateAdultQuantity(state, action) {
      state.adultQuantity = action.payload;
      state.totalPrice =
        state.adultQuantity * state.placeObj.adultPrice +
        state.childrenQuantity * state.placeObj.childrenPrice;
    },
    changeChildrenQuantity(state, action) {
      state.childrenQuantity = state.childrenQuantity + action.payload;
      state.totalPrice =
        state.adultQuantity * state.placeObj.adultPrice +
        state.childrenQuantity * state.placeObj.childrenPrice;
    },
    updateChildrenQuantity(state, action) {
      state.childrenQuantity = action.payload;
      state.totalPrice =
        state.adultQuantity * state.placeObj.adultPrice +
        state.childrenQuantity * state.placeObj.childrenPrice;
    },
  },
});

export const ticketActions = ticketSlice.actions;
export default ticketSlice;
