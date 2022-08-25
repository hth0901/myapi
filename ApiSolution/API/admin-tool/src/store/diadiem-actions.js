import { diadiemActions } from './diadiem-slice'

const API_URL = process.env.REACT_APP_URL

export const truyVanDanhSachDiaDiemGiaVe = () => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await fetch(
                `${API_URL}/api/DiaDiem/danhsachgiavediadiem`
            )
            if (!response.ok) {
                throw new Error('co chi do sai sai roi')
            }

            const data = await response.json()
            return data
        }

        const getDataDetail = async () => {
            const response = await fetch(
                `${API_URL}/api/DiaDiem/danhsachgiavediadiemchitiet`
            )
            if (!response.ok) {
                throw new Error('co chi do sai sai roi')
            }

            const data = await response.json()
            return data
        }

        try {
            const placeData = await getData()
            const priceData = await getDataDetail()
            placeData.forEach((place) => {
                place.priceDetail = []
                priceData.forEach((price) => {
                    if (price.listPlaceID === place.id) {
                        place.priceDetail.push(price)
                    }
                })
            })
            dispatch(
                diadiemActions.truyvanDanhSachDiaDiemGiaVe({
                    items: placeData,
                })
            )
        } catch (error) {}
    }
}

export const truyVanDanhSachDiaDiem = () => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await fetch(`${API_URL}/api/DiaDiem`)
            if (!response.ok) {
                throw new Error('co chi do sai sai roi')
            }

            const data = await response.json()
            return data
        }

        try {
            const placeData = await getData()
            dispatch(
                diadiemActions.truyvanDanhSachDiaDiem({
                    items: placeData,
                })
            )
        } catch (error) {}
    }
}

export const truyvanChiTietDiaDiem = (placeId) => {
    return async (dispatch) => {
        const getData = async () => {
            // const response = await fetch(
            //   `${configData.apiBaseUrl}/DiaDiem/${placeId}`
            // );

            // if (!response.ok) {
            //   throw new Error("Something went wrong!!");
            // }

            const p1 = fetch(`${API_URL}/api/DiaDiem/${placeId}`)
            const p2 = fetch(
                `${API_URL}/api/image/danhsachimagetheodiadiem/${placeId}`
            )

            const arrRes = await Promise.all([p1, p2])

            if (!arrRes[0].ok || !arrRes[1].ok) {
                throw new Error('Something went wrong!!')
            }

            const arrResult = await Promise.all([
                arrRes[0].json(),
                arrRes[1].json(),
            ])

            const placeDetail = { ...arrResult[0] }
            placeDetail.lstImage = [...arrResult[1]]

            return placeDetail
        }

        try {
            const placeData = await getData()
            dispatch(
                diadiemActions.setThongTinChiTietDiaDiem({
                    ...placeData,
                })
            )
        } catch (error) {}
    }
}
