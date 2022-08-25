import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        customerInfo: null,
        orderId: '',
        orderInfo: null,
        ticketId: '',
    },
    reducers: {
        resetOrder(state, action) {
            state.customerInfo = null
            state.orderId = ''
            state.orderInfo = null
            state.ticketId = ''
        },
        setTicketId(state, action) {
            state.ticketId = action.payload
        },
        setCustomerInfo(state, action) {
            state.customerInfo = {
                fullName: action.payload.fullName,
                phoneNumber: action.payload.phoneNumber,
                email: action.payload.email,
                uniqId: action.payload.uniqId,
            }
        },
        setOrderId(state, action) {
            state.orderId = action.payload
        },
        setOrderInfo(state, action) {
            const placeSet = new Set()
            const customerTypeSet = new Set()
            const placeArr = []
            const customerTypeArr = []
            console.log(action.payload.ticketPlaceDetails)
            action.payload.ticketPlaceDetails.forEach((el) => {
                placeSet.add(el.ticketTypeId)
                customerTypeSet.add(el.customerType)
            })
            ;[...customerTypeSet].forEach((el) => {
                const obj = {
                    customerTypeName: '',
                    customerType: el,
                    quantity: 0,
                }

                action.payload.ticketPlaceDetails.forEach((elDt) => {
                    if (elDt.customerType === el) {
                        obj.customerTypeName = elDt.customerTypeName
                        obj.quantity = obj.quantity + elDt.quantity
                    }
                })

                customerTypeArr.push(obj)
            })
            ;[...placeSet].forEach((el) => {
                const placeObj = {
                    placeId: el,
                    details: [],
                }
                action.payload.ticketPlaceDetails.forEach((elDt) => {
                    if (elDt.ticketTypeId === el) {
                        placeObj.name = elDt.placeName
                        placeObj.details.push({
                            customerType: elDt.customerType,
                            quantity: elDt.quantity,
                        })
                    }
                })
                placeArr.push(placeObj)
            })
            console.log(placeSet)
            console.log(placeArr)

            state.orderInfo = {
                id: action.payload.id,
                totalPrice: action.payload.totalPrice,
                fullName: action.payload.fullName,
                phoneNumber: action.payload.phoneNumber,
                email: action.payload.email,
                uniqId: action.payload.uniqId,
                payStatus: action.payload.payStatus,
                ticketId: action.payload.ticketId,
                ticketPlaceDetails: placeArr,
                customerTypeDetails: customerTypeArr,
            }
        },
    },
})

export const orderActions = orderSlice.actions

export default orderSlice
