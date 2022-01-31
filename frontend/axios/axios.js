import {getCookie} from "../actions/auth";
import {API} from "../config";

const token = getCookie('token');
import axios from "axios";


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