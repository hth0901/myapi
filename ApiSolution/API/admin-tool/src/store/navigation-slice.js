import { createSlice } from '@reduxjs/toolkit'

const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        arrNav: [],
    },
    reducers: {
        setNavigation(state, action) {
            const lstNav = [...action.payload.listNav]
            // console.log(lstNav)
            state.arrNav = [...lstNav]
        },
    },
})

export const navigationActions = navigationSlice.actions

export default navigationSlice
