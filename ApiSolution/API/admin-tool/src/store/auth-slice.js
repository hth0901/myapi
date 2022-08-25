import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isInitialised: false,
        user: null,
        errorMessage: '',
        token: '',
        arrRoles: [],
    },
    reducers: {
        autoLogin(state, action) {
            state.isAuthenticated = true
            state.user = { ...action.payload.curUser }
            state.token = action.payload.token
            state.isInitialised = true
        },
        login(state, action) {
            const userInfo = {
                displayName: action.payload.displayName,
                username: action.payload.username,
                roleid: action.payload.roleId,
            }
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(userInfo))
            state.isAuthenticated = true
            state.user = { ...userInfo }
            state.token = action.payload.token
            state.errorMessage = ''
            state.isInitialised = true
        },
        logout(state, action) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            state.isAuthenticated = false
            state.user = null
            state.token = ''
            state.errorMessage = ''
        },
        loginError(state, action) {
            state.errorMessage = action.payload.errorMessage
        },
        setArrRoles(state, action) {
            state.arrRoles = [...action.payload.data]
        },
    },
})

export const authActions = authSlice.actions

export default authSlice
