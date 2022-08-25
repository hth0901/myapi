import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import Cookies from 'js-cookie'

const API_URL = process.env.REACT_APP_URL

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
    errorMessage: '',
    token: '',
    arrRoles: [],
}

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
        const { token, user } = accessToken
        localStorage.setItem('accessToken', token)
        localStorage.setItem('userInfo', JSON.stringify(user))
        // localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userInfo')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                errorMessage: '',
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                errorMessage: '',
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                errorMessage: '',
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                errorMessage: '',
                isAuthenticated: true,
                user,
            }
        }
        case 'ERROR': {
            return {
                ...state,
                errorMessage:
                    'Đăng nhập không thành công, hãy kiểm tra lại tài khoản',
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email, password) => {
        // const response = await axios.post('/api/auth/login', {
        //     email,
        //     password,
        // })
        // const { accessToken, user } = response.data
        //console.log("tokendaauf tien",accessToken);
        // console.log('response đăng nhập', response)
        try {
            const res = await fetch(`${API_URL}/api/account/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: email,
                    Password: password,
                }),
            })
            if (!res.ok) {
                throw new Error('Đăng nhập không thành công')
            }
            const data = await res.json()
            console.log(data)
            const { token, displayName } = data
            const userInfo = {
                name: displayName,
            }
            setSession({ token, user: { ...userInfo } })

            dispatch({
                type: 'LOGIN',
                payload: {
                    user: { ...userInfo },
                },
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
            })
        }
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        Cookies.remove('user')
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        // ;(async () => {
        //     try {
        //         const accessToken = window.localStorage.getItem('accessToken')

        //         if (accessToken && isValidToken(accessToken)) {
        //             setSession(accessToken)
        //             // const response = await axios.get('/api/auth/profile')
        //             // const { user } = response.data
        //             const currentUser = window.localStorage.getItem('userInfo')
        //             console.log(currentUser)

        //             dispatch({
        //                 type: 'INIT',
        //                 payload: {
        //                     isAuthenticated: true,
        //                     // user,
        //                 },
        //             })
        //         } else {
        //             dispatch({
        //                 type: 'INIT',
        //                 payload: {
        //                     isAuthenticated: false,
        //                     user: null,
        //                 },
        //             })
        //         }
        //     } catch (err) {
        //         console.error(err)
        //         dispatch({
        //             type: 'INIT',
        //             payload: {
        //                 isAuthenticated: false,
        //                 user: null,
        //             },
        //         })
        //     }
        // })()
        try {
            const accessToken = window.localStorage.getItem('accessToken')

            if (accessToken && isValidToken(accessToken)) {
                // setSession(accessToken)
                // const response = await axios.get('/api/auth/profile')
                // const { user } = response.data
                const currentUser = window.localStorage.getItem('userInfo')
                const userInfo = JSON.parse(currentUser)

                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: true,
                        user: { ...userInfo },
                    },
                })
            } else {
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        } catch (err) {
            console.error(err)
            dispatch({
                type: 'INIT',
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            })
        }
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
