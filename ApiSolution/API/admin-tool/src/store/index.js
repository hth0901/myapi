import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import authenSlice from './authen-slice'
import commonSlice from './common-slice'
import diadiemSlice from './diadiem-slice'
import navigationSlice from './navigation-slice'
import orderSlice from './order-slice'
import placeCartSlice from './placeCart-slice'
import serviceCartSlice from './serviceCart-slice'
import sukienSlice from './sukien-slice'
import ticketSlice from './ticket-slice'
import uiSlice from './ui-slice'

const store = configureStore({
    reducer: {
        ticket: ticketSlice.reducer,
        diadiem: diadiemSlice.reducer,
        order: orderSlice.reducer,
        placeCart: placeCartSlice.reducer,
        serviceCart: serviceCartSlice.reducer,
        ui: uiSlice.reducer,
        sukien: sukienSlice.reducer,
        authen: authenSlice.reducer,
        auth: authSlice.reducer,
        navigation: navigationSlice.reducer,
        common: commonSlice.reducer,
    },
})

export default store
