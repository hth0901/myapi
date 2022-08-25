import axios from 'axios'
export const GET_ANH_DANHSACH = 'GET_ANH_DANHSACH'

const BASE_URL = process.env.REACT_APP_URL

export const getAnh = () => (dispatch) => {
    axios.get(`${BASE_URL}/api/Image`).then((res) => {
        dispatch({
            type: GET_ANH_DANHSACH,
            payload: res.data,
        })
    })
}
