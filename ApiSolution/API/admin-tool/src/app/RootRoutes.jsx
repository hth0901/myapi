import React from 'react'
import { Navigate } from 'react-router-dom'

import dashboardRoutes from './views/dashboard/DashboardRoutes'
import utilitiesRoutes from './views/utilities/UtilitiesRoutes'

import materialRoutes from './views/material-kit/MaterialRoutes'
import chartsRoute from './views/charts/ChartsRoute'
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute'

import formsRoutes from './views/forms/FormsRoutes'
import mapRoutes from './views/map/MapRoutes'
import banveRouters from './views/banve/BanveRoute'

const redirectRoute = [
    {
        path: '/admin-tool',
        exact: true,
        component: () => <Navigate to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Navigate to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...chartsRoute,
    ...dragAndDropRoute,
    ...banveRouters,
    ...formsRoutes,
    ...mapRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
