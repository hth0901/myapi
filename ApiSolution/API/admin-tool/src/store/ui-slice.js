import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showLoading: false
    },
    reducers: {
        setShowLoading(state, action) {
            state.showLoading = action.payload;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;