import {ERROR_CLEAR_ERROR, ERROR_SET_ERROR} from "./errorsTypes";

const errorReducerInitialState = {
    isErrored: false,
    errorObj: null
}
export const errorsReducer = (state = errorReducerInitialState, action) =>{
    switch (action.type){
        case ERROR_SET_ERROR:
            return {...state, isErrored: true, errorObj: action.payload}
        case ERROR_CLEAR_ERROR:
            return {...errorReducerInitialState}
        default: return state
    }
}