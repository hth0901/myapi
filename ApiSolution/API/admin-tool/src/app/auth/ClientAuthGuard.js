import React, { Fragment, useEffect, useState } from 'react'

import { useNavigate, Navigate, useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL

const ClientAuthGuard = (props) => {
    const location = useLocation()
    const { children } = props
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    useEffect(() => {
        const curStrUser = localStorage.getItem('user')
        const curUser = JSON.parse(curStrUser)
        const curRoleId = (curUser && curUser.roleid) || -1
        console.log(location.pathname)
        console.log(curUser)
        console.log(curRoleId)
        // setIsAuthenticated(false)
        fetch(
            `${BASE_URL}/api/menu/getclientautho/${encodeURIComponent(
                location.pathname
            )}`
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Proccess Error')
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                // setIsAuthenticated(false)
            })
    }, [])
    if (!isAuthenticated) {
        return (
            <Navigate
                to={{
                    pathname: '/home-page',
                }}
            />
        )
        // return (
        //     <Fragment>
        //         <h1>not authen</h1>
        //     </Fragment>
        // )
    }
    return <Fragment>{children}</Fragment>
}

export default ClientAuthGuard
