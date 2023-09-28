import axios from "axios";

export const axiosRequest = axios.create({
    baseURL: 'http://192.168.0.100:3000/'
})