import {
    USER_SET_AUTH_ERROR,
    USER_SET_LOADED_USER,
    USER_SET_LOADING,
    USER_SET_LOGIN_SUCCESS,
    USER_SET_LOGOUT_USER,
    USER_SET_REGISTER_SUCCESS
} from "./userTypes";
import {axiosRequest} from "../../../Axios/axiosRequest";

const userReducerInitialState = {
    token: localStorage.getItem('mm-token') || null,
    isAuthenticated: false,
    isLoading: false,
    isLoaded: false,
    user: null
}

export const userReducer = (state = userReducerInitialState, action) => {
    switch (action.type){
        case USER_SET_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_SET_LOADED_USER:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case USER_SET_LOGIN_SUCCESS:
        case USER_SET_REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                isLoaded: true,
                token: action.payload.token,
                user: action.payload.user
            }
        case USER_SET_LOGOUT_USER:
        case USER_SET_AUTH_ERROR:
            localStorage.removeItem('mm-token')
            axiosRequest.defaults.headers['mm-token'] = ""
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                isLoaded: true
            }
        default: return state
    }
}
