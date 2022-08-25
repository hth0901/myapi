import axios from 'axios'
export const GET_DIADIEM_DANHSACH = 'GET_DIADIEM_DANHSACH'

const BASE_URL = process.env.REACT_APP_URL

export const getDiaDiem = () => (dispatch) => {
    axios.get(`${BASE_URL}/api/DiaDiem`).then((res) => {
        dispatch({
            type: GET_DIADIEM_DANHSACH,
            payload: res.data,
        })
    })
}
