import React, { useState } from 'react'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
 

const API_URL = process.env.REACT_APP_URL
const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
    } else {
        localStorage.removeItem('accessToken')
    }
}

const BanVeAuthContext = React.createContext({
    token: '',
    isAuthenticated: false,
    displayUser: '',
    login: async (uname, pword) => {},
    logout: () => {},
    message: '',
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState('')
    const [errMessage, setErrMessage] = useState('')
    const [displayUser, setDisplayUser] = useState('')

    const userIsLoggedIn = !!token

    const loginHandler = async (uname, pword) => {
        var raw = JSON.stringify({
            Username: uname,
            Password: pword,
        })

        try {
            const res = await fetch(`${API_URL}/api/account/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: raw,
            })
            if (!res.ok) {
                throw new Error('Đăng nhập không thành công')
            }

            const data = await res.json()
            const { token, displayName } = data
            setToken(token)
            setDisplayUser(displayName)
        } catch (err) {
            setErrMessage(err.message)
        }
    }

    const logoutHandler = () => {
        setToken(null)
    }

    const contextValue = {
        token: token,
        isAuthenticated: userIsLoggedIn,
        displayUser: displayUser,
        login: loginHandler,
        logout: logoutHandler,
        message: errMessage,
    }

    return (
        <BanVeAuthContext.Provider value={contextValue}>
            {props.children}
        </BanVeAuthContext.Provider>
    )
}

export default BanVeAuthContext
