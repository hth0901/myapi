import React, {
    // useContext,
    useEffect,
    useState,
} from 'react'
import { Navigate, useLocation } from 'react-router-dom'
// import AppContext from "app/appContext";
import useAuth from 'app/hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from 'store/auth-slice'
import jwtDecode from 'jwt-decode'
import { getRoles } from 'store/auth-actions'

// const getUserRoleAuthStatus = (pathname, user, routes) => {
//   const matched = routes.find((r) => r.path === pathname);

//   const authenticated =
//     matched && matched.auth && matched.auth.length
//       ? matched.auth.includes(user.role)
//       : true;
//   console.log(matched, user);
//   return authenticated;
// };

const AuthGuard = ({ children }) => {
    // const {
    //     isAuthenticated,
    //     // user
    // } = useAuth()

    const dispatch = useDispatch()

    const { isAuthenticated, isInitialised } = useSelector((state) => {
        return state.auth
    })

    const [previouseRoute, setPreviousRoute] = useState(null)
    const { pathname } = useLocation()

    // const { routes } = useContext(AppContext);
    // const isUserRoleAuthenticated = getUserRoleAuthStatus(pathname, user, routes);
    // let authenticated = isAuthenticated && isUserRoleAuthenticated;

    // IF YOU NEED ROLE BASED AUTHENTICATION,
    // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
    // AND COMMENT OUT BELOW LINE
    let authenticated = isAuthenticated

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    useEffect(() => {
        console.log(isInitialised)
        if (isInitialised) return
        const curToken = localStorage.getItem('token')
        const curStrUser = localStorage.getItem('user')
        const curUser = JSON.parse(curStrUser)
        if (!curToken) return
        const decodedToken = jwtDecode(curToken)
        const currentTime = Date.now() / 1000
        if (decodedToken <= currentTime) return
        dispatch(
            authActions.autoLogin({
                curUser: curUser,
                token: curToken,
            })
        )
    }, [isInitialised])

    // return <>{children}</>

    useEffect(() => {
        if (authenticated) {
            dispatch(getRoles())
        }
    }, [authenticated])

    if (authenticated) return <>{children}</>
    else {
        return (
            <Navigate
                to={{
                    pathname: '/session/signin',
                    state: { redirectUrl: previouseRoute },
                }}
            />
        )
    }
}

export default AuthGuard
