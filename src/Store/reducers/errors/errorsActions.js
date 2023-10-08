import {ERROR_CLEAR_ERROR, ERROR_SET_ERROR, ERROR_SET_MESSAGE_ERROR} from "./errorsTypes";

export const setError = (error) => ({type: ERROR_SET_ERROR, payload: error})
export const setMessageError = (text) =>({type: ERROR_SET_MESSAGE_ERROR, payload: text})
export const clearError = () => ({type: ERROR_CLEAR_ERROR})
