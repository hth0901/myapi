import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        arrCustomerType: [],
    },
    reducers: {
        setArrCustomerType(state, action) {
            state.arrCustomerType = [...action.payload.data]
        },
    },
})

export const commonActions = commonSlice.actions

export default commonSlice
