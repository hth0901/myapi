import {
    GET_DIADIEM_DANHSACH
} from '../actions/DiaDiemAction'


const initialState = [];

const DiaDiemReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_DIADIEM_DANHSACH: {
            return (action.payload)          
        }     
        default: {
            return {
                ...state,
            }
        }
    }
}

export default DiaDiemReducer
