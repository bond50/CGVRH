import {getCookie} from "../actions/auth";
import {API} from "../config";
import axios from "axios";

const token = getCookie('token');


const axiosInstance = axios.create({
    baseURL: API,
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

axiosInstance.interceptors.request.use((req) => {
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})
export default axiosInstance