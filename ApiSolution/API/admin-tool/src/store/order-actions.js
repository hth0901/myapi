import { orderActions } from './order-slice'
import { uiActions } from './ui-slice'

const API_URL = process.env.REACT_APP_URL

export const createOrderTemp = (orderData) => {
    return async (dispatch) => {
        const orderResultId = async () => {
            const tk = localStorage.getItem('token')
            const response = await fetch(`${API_URL}/api/pay/createorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tk}`,
                },
                body: JSON.stringify(orderData),
            })

            if (!response.ok) {
                const errorMessage = await response.text()
                throw new Error(errorMessage)
            }

            const data = await response.json()

            return data
        }

        try {
            const orderObj = await orderResultId()
            dispatch(orderActions.setOrderId(orderObj.id))
            //   console.log(orderId);
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const getTicketId = (orderId) => {
    return async (dispatch) => {
        dispatch(uiActions.setShowLoading(true))

        const result = async () => {
            const response = await fetch(
                `${API_URL}/api/Pay/ticketid/${orderId}`
            )
            if (!response.ok) {
                const errorMessage = await response.text()
                throw new Error(errorMessage)
            }

            const data = await response.json()
            return data
        }

        setTimeout(async () => {
            try {
                const ticketObj = await result()
                dispatch(orderActions.setTicketId(ticketObj))
                dispatch(uiActions.setShowLoading(false))
            } catch (err) {
                console.log(err.message)
                dispatch(uiActions.setShowLoading(false))
            }
        }, 5000)
    }
}

export const getTicketDetail = (orderId) => {
    // console.log(orderId);
    return async (dispatch) => {
        dispatch(uiActions.setShowLoading(true))

        const ticketResult = async () => {
            const response = await fetch(`${API_URL}/api/Pay/ticket/${orderId}`)
            if (!response.ok) {
                const errorMessage = await response.text()
                throw new Error(errorMessage)
            }

            const data = await response.json()
            return data
        }

        setTimeout(async () => {
            try {
                const ticketObj = await ticketResult()
                console.log(ticketObj)
                dispatch(orderActions.setOrderInfo(ticketObj))
                dispatch(uiActions.setShowLoading(false))
            } catch (err) {
                console.log(err.message)
                dispatch(uiActions.setShowLoading(false))
            }
        }, 5000)
    }
}
