import { useMediaQuery } from '@material-ui/core'
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles'
import AppContext from 'app/contexts/AppContext'
import useSettings from 'app/hooks/useSettings'
import DiaDiem from 'app/views/banve/diadiem'
import clsx from 'clsx'
import React, { useContext, useEffect, useRef } from 'react'
import Scrollbar from 'react-perfect-scrollbar'
import { Route, Routes } from 'react-router-dom'
import banveRouters from '../../../views/banve/BanveRoute'
import Footer from '../../Footer/Footer'
import SidenavTheme from '../../MatxTheme/SidenavTheme/SidenavTheme'
import SecondarySidebar from '../../SecondarySidebar/SecondarySidebar'
import Layout1Sidenav from './Layout1Sidenav'
// import { renderRoutes } from 'react-router-config'
import Layout1Topbar from './Layout1Topbar'

// const MY_ROUTES = [
//     {
//         path: '/quanlydiadiem/*',
//         component: <DiaDiem />,
//     },
//     {
//         path: '/quanlydiadiem/themmoi',
//         component: <FormAdd />,
//     },
//     {
//         path: '/quanlydiadiem/:id/chinhsua',
//         component: <FormEdit />,
//     },
//     //SƯ KIEN
//     {
//         path: '/quanlysukien/*',
//         component: <SuKien />,
//     },
//     {
//         path: '/quanlysukien/themmoi',
//         component: <SuKienAdd />,
//     },
//     {
//         path: '/quanlysukien/:id/chinhsua',
//         component: <SuKienEdit />,
//     },
//     //ĐẠI NỘI
//     {
//         path: '/quanlydainoi/*',
//         component: <DaiNoi />,
//     },
//     {
//         path: '/quanlydainoi/themmoi',
//         component: <DaiNoiAdd />,
//     },
//     {
//         path: '/quanlydainoi/:id/chinhsua',
//         component: <DaiNoiEdit />,
//     },
//     // DOI TUONG
//     {
//         path: '/quanlydoituong/*',
//         component: <DoiTuong />,
//     },
//     // TẠO VÉ
//     {
//         path: '/quanlytaove',
//         component: <TaoVe />,
//     },
//     // GIÁ VÉ
//     {
//         path: '/quanlygiave/*',
//         component: <GiaVe />,
//     },
//     {
//         path: '/quanlygiave/:id/chinhsua',
//         component: <SuaGiaVe />,
//     },
//     //Nguoi dung
//     {
//         path: '/quanlynguoidung',
//         component: <NguoiDung />,
//     },
// ]

const useStyles = makeStyles(({ palette, ...theme }) => ({
    contentWrap: ({ width, secondarySidebar }) => {
        return {
            verticalAlign: 'top',
            marginLeft: width,
            transition: 'all 0.3s ease',
            // [theme.breakpoints.up("sm")]: {
            marginRight: secondarySidebar.open ? 50 : 0,
            // },
        }
    },
    topbar: {
        top: 0,
        zIndex: 96,
        background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',
        transition: 'all 0.3s ease',
    },
}))

const Layout1 = () => {
    const { settings, updateSettings } = useSettings()
    const { layout1Settings, secondarySidebar } = settings
    const {
        leftSidebar: { mode: sidenavMode, show: showSidenav },
    } = layout1Settings
    const { routes } = useContext(AppContext)

    const getSidenavWidth = () => {
        switch (sidenavMode) {
            case 'full':
                return 'var(--sidenav-width)'
            case 'compact':
                return 'var(--sidenav-compact-width)'
            default:
                return '0px'
        }
    }

    const sidenavWidth = getSidenavWidth()
    let classes = useStyles({ width: sidenavWidth, secondarySidebar })
    const theme = useTheme()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))

    const ref = useRef({ isMdScreen, settings })

    const topbarTheme = settings.themes[layout1Settings.topbar.theme]
    const layoutClasses = `theme-${theme.palette.type} flex`

    useEffect(() => {
        let { settings } = ref.current
        let sidebarMode = settings.layout1Settings.leftSidebar.mode
        if (settings.layout1Settings.leftSidebar.show) {
            let mode = isMdScreen ? 'close' : sidebarMode
            updateSettings({ layout1Settings: { leftSidebar: { mode } } })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMdScreen])

    const mComponent = <DiaDiem />

    return (
        <div className={clsx('bg-default', layoutClasses)}>
            {showSidenav && sidenavMode !== 'close' && (
                <SidenavTheme>
                    <Layout1Sidenav />
                </SidenavTheme>
            )}

            <div
                className={clsx(
                    'flex-grow flex-column relative overflow-hidden h-full-screen',
                    classes.contentWrap
                )}
            >
                {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                    <ThemeProvider theme={topbarTheme}>
                        <Layout1Topbar fixed={true} className="elevation-z8" />
                    </ThemeProvider>
                )}

                {settings.perfectScrollbar && (
                    <Scrollbar className="flex-grow flex-column relative h-full">
                        {layout1Settings.topbar.show &&
                            !layout1Settings.topbar.fixed && (
                                <ThemeProvider theme={topbarTheme}>
                                    <Layout1Topbar />
                                </ThemeProvider>
                            )}
                        <div className="relative flex-grow">
                            {/* <MatxSuspense>{renderRoutes(routes)}</MatxSuspense> */}
                            {/* <MatxSuspense>{renderRoutes(routes)}</MatxSuspense> */}
                            {/* <MatxSuspense> */}
                            <Routes>
                                {/* <Route
                                        path="/quanlydiadiem"
                                        element={<DiaDiem />}
                                    /> */}
                                {banveRouters.map((el, idx) => {
                                    return (
                                        <Route
                                            key={idx}
                                            path={el.path}
                                            element={el.component}
                                        />
                                    )
                                })}
                                {/* {routes.map((el, idx) => {
                                    return (
                                        <Route
                                            key={idx}
                                            path={el.path}
                                            element={el.component}
                                        />
                                    )
                                })} */}
                                {/* <Route
                                    path="/quanlydiadiem"
                                    element={mComponent}
                                /> */}
                            </Routes>
                            {/* </MatxSuspense> */}
                        </div>
                        {settings.footer.show && !settings.footer.fixed && (
                            <Footer />
                        )}
                    </Scrollbar>
                )}

                {!settings.perfectScrollbar && (
                    <div className="flex-grow flex-column relative h-full scroll-y">
                        {layout1Settings.topbar.show &&
                            !layout1Settings.topbar.fixed && (
                                <ThemeProvider theme={topbarTheme}>
                                    <Layout1Topbar />
                                </ThemeProvider>
                            )}
                        <div className="relative flex-grow">
                            {/* <MatxSuspense>{renderRoutes(routes)}</MatxSuspense> */}
                            {/* <MatxSuspense>{renderRoutes(routes)}</MatxSuspense> */}
                            {/* <MatxSuspense> */}
                            <Routes>
                                {/* <Route
                                        path="/quanlydiadiem"
                                        element={<DiaDiem />}
                                    /> */}
                                {banveRouters.map((el, idx) => {
                                    return (
                                        <Route
                                            key={idx}
                                            path={el.path}
                                            element={el.component}
                                        />
                                    )
                                })}
                                {/* {routes.map((el, idx) => {
                                    return (
                                        <Route
                                            key={idx}
                                            path={el.path}
                                            element={
                                                <Fragment>
                                                    {el.component}
                                                </Fragment>
                                            }
                                        />
                                    )
                                })} */}
                                {/* <Route
                                    path="/quanlydiadiem"
                                    element={mComponent}
                                /> */}
                            </Routes>
                            {/* </MatxSuspense> */}
                        </div>
                        {settings.footer.show && !settings.footer.fixed && (
                            <Footer />
                        )}
                    </div>
                )}

                {settings.footer.show && settings.footer.fixed && <Footer />}
            </div>
            {settings.secondarySidebar.show && <SecondarySidebar />}
        </div>
    )
}

export default React.memo(Layout1)
