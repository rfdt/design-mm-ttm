import {axiosRequest} from "../Axios/axiosRequest";

export class UserApi {
    static auth_prefix = 'auth/'
    static registerUser(newUser){
        return axiosRequest.post(UserApi.auth_prefix + 'register', newUser)
    }

    static loginUser(loginUser){
        return axiosRequest.post(UserApi.auth_prefix + 'login', loginUser)
    }

    static loadUser(){
        return axiosRequest.get(UserApi.auth_prefix + 'me')
    }
}
