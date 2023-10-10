import axios from "axios";

export const axiosRequest = axios.create({
    baseURL: 'http://192.168.43.43:3000/',
    headers: {
        'mm-token': localStorage.getItem('mm-token') || ''
    }
})
