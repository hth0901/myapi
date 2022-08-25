import {
    GET_ANH_DANHSACH
} from '../actions/AnhAction'
const initialState = [];
const AnhReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ANH_DANHSACH: {
            return (action.payload)           
        }     
        default: {
            return {
                ...state,
            }
        }
    }
}

export default AnhReducer
