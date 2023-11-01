import axios from "axios";
import {store} from "../Store/store";
import {logoutUser} from "../Store/reducers/user/userActions";

export const axiosRequest = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        'mm-token': localStorage.getItem('mm-token') || ''
    }
})

axiosRequest.interceptors.response.use(
    response => response,
    error => {
        const {status} = error.response;
        if(status === 401){
            store.dispatch(logoutUser());
        }
        return Promise.reject(error);
    }
)
