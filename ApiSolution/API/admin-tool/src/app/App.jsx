import '../fake-db'
import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, BrowserRouter, Routes } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import history from 'history.js'
import routes from './RootRoutes'
// import { Store } from './redux/Store'
import store from '../store/index'
import { GlobalCss, MatxSuspense, MatxTheme, MatxLayout } from 'app/components'
import sessionRoutes from './views/sessions/SessionRoutes'
import AuthGuard from './auth/AuthGuard'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import hthTestPage from './views/customer-pages/hthTestPage'
import kdcPage from './views/customer-pages/kdcPage'
import KdcTestPage from './views/pages/KdcTestPage'
import HthTestPage from './views/pages/HthTestPage'
import MainContent from './MainContent'
import classes from './css.css'

import viMessages from 'devextreme/localization/messages/vi.json'
import { locale, loadMessages } from 'devextreme/localization'

const App = () => {
    loadMessages(viMessages)
    locale('vi')
    return (
        <AppContext.Provider value={{ routes }}>
            <Provider store={store}>
                <SettingsProvider>
                    {/* <MatxTheme> */}
                    {/* <GlobalCss /> */}
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <MainContent />
                        {/* <Router history={history}> */}
                        {/* <AuthProvider> */}
                        {/* <MatxSuspense> */}
                        {/* <Routes> */}
                        {/* AUTHENTICATION PAGES (SIGNIN, SIGNUP ETC.) */}
                        {/* {sessionRoutes.map((item, i) => (
                                            <Route
                                                key={i}
                                                path={item.path}
                                                component={item.component}
                                            />
                                        ))} */}

                        {/* {sessionRoutes.map((item, i) => {
                                            return (
                                                <Route
                                                    key={i}
                                                    path={item.path}
                                                    element={item.component}
                                                />
                                            )
                                        })}
                                        <Route
                                            path="/admin-tool/*"
                                            element={
                                                <AuthGuard>
                                                    <MatxLayout />
                                                </AuthGuard>
                                            }
                                        /> */}
                        {/* AUTH PROTECTED DASHBOARD PAGES */}
                        {/* <AuthGuard> */}
                        {/* <MatxLayout />{' '} */}
                        {/* RETURNS <Layout1/> component */}
                        {/* </AuthGuard> */}
                        {/* </Routes> */}
                        {/* </MatxSuspense> */}
                        {/* </AuthProvider> */}
                        {/* </Router> */}
                    </BrowserRouter>
                    {/* </MatxTheme> */}
                </SettingsProvider>
            </Provider>
        </AppContext.Provider>
    )
}

export default App
