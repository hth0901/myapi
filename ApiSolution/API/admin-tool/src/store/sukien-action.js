import { sukienActions } from './sukien-slice'

const API_URL = process.env.REACT_APP_URL

export const truyvanDanhSachSuKien = () => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await fetch(`${API_URL}/api/sukien`)
            if (!response.ok) {
                throw new Error('co chi do sai sai roi')
            }

            const data = await response.json()
            return data
        }

        try {
            const sukienData = await getData()
            sukienData.forEach((el) => {
                el.imageUrl = el.listImage[0] || ''
            })
            dispatch(
                sukienActions.truyvanDanhSachSuKien({
                    items: sukienData,
                })
            )
        } catch (error) {}
    }
}
