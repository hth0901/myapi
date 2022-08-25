import { authActions } from './auth-slice'

const API_URL = process.env.REACT_APP_URL
export const doLogin = (uname, pword) => {
    // console.log(uname, pword)
    return async (dispatch) => {
        const getData = async () => {
            const res = await fetch(`${API_URL}/api/account/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: uname,
                    Password: pword,
                }),
            })
            if (!res.ok) {
                throw new Error('Đăng nhập không thành công')
            }
            const data = await res.json()
            return data
        }

        try {
            const loginData = await getData()
            dispatch(authActions.login({ ...loginData }))
        } catch (err) {
            dispatch(authActions.loginError({ errorMessage: err.message }))
        }
    }
}

export const getRoles = () => {
    return async (dispatch) => {
        const getData = async () => {
            const res = await fetch(`${API_URL}/api/account/danhsachvaitro`)
            if (!res.ok) {
                throw new Error('Proccess Error')
            }

            const data = await res.json()
            return data
        }

        try {
            const rolesData = await getData()
            dispatch(authActions.setArrRoles({ data: rolesData }))
        } catch (err) {
            console.log(err.message)
        }
    }
}
