import {ERROR_CLEAR_ERROR, ERROR_SET_ERROR, ERROR_SET_MESSAGE_ERROR} from "./errorsTypes";

const errorReducerInitialState = {
    errorMessage: "",
    isErrored: false,
    errorObj: null
}
export const errorsReducer = (state = errorReducerInitialState, action) =>{
    switch (action.type){
        case ERROR_SET_ERROR:
            return {...state, errorMessage:"", isErrored: true, errorObj: action.payload}
        case ERROR_SET_MESSAGE_ERROR:
            return {...state, errorMessage: action.payload, isErrored: true, errorObj: null}
        case ERROR_CLEAR_ERROR:
            return {...errorReducerInitialState}
        default: return state
    }
}
