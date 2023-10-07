import {
    USER_SET_AUTH_ERROR,
    USER_SET_LOADED_USER,
    USER_SET_LOADING,
    USER_SET_LOGIN_SUCCESS, USER_SET_LOGOUT_USER,
    USER_SET_REGISTER_SUCCESS
} from "./userTypes";
import {UserApi} from "../../../Api/UserApi";
import {setError} from "../errors/errorsActions";
import {axiosRequest} from "../../../Axios/axiosRequest";

const setUserLoadingAC = () => ({type: USER_SET_LOADING});
const setRegisterSuccessAC = (registeredUser) => ({type: USER_SET_REGISTER_SUCCESS, payload: registeredUser});
const setLoginSuccessAC = (loginedUser) =>({type: USER_SET_LOGIN_SUCCESS, payload: loginedUser});
const setLoadedUserAC = (loadedUser) => ({type: USER_SET_LOADED_USER, payload: loadedUser});
const setUserErrorAC = () =>({type: USER_SET_AUTH_ERROR})

export const registerUser = (newUser) => async (dispatch)=>{
    try{
        const registeredUser = await UserApi.registerUser(newUser);
        dispatch(setRegisterSuccessAC(registeredUser.data));
        localStorage.setItem('mm-token', registeredUser.data.token);
        axiosRequest.defaults.headers['mm-token'] = registeredUser.data.token;
    }catch (e){
        dispatch(setError(e));
    }
}

export const loginUser = (user) => async (dispatch)=>{
    try{
        const loginedUser = await UserApi.loginUser(user);
        localStorage.setItem('mm-token', loginedUser.data.token);
        axiosRequest.defaults.headers['mm-token'] = loginedUser.data.token
        dispatch(setLoginSuccessAC(loginedUser.data));
    }catch (e){
        dispatch(setError(e));
    }
}

export const loadUser = () => async (dispatch)=>{
    try {
        if(localStorage.getItem('mm-token')) {
            dispatch(setUserLoadingAC());
            const loadedUser = await UserApi.loadUser();
            dispatch(setLoadedUserAC(loadedUser.data));
        }else {
            dispatch(setUserErrorAC())
        }
    }catch (e){
        dispatch(setUserErrorAC())
        dispatch(setError(e));
    }
}

export const logoutUser = () => async (dispatch) =>{
    dispatch({type: USER_SET_LOGOUT_USER})
}
