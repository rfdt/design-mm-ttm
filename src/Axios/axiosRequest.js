import axios from "axios";

export const axiosRequest = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'mm-token': localStorage.getItem('mm-token') || ''
    }
})
