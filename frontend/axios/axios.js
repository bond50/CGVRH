import axios from "axios";
import {API} from "../config";
import {getCookie, handleResponse} from "../actions/auth";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: API,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Request interceptor to include the token
axiosInstance.interceptors.request.use((req) => {
    const token = getCookie('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle errors
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Check for specific status codes and handle appropriately
    if (error.response && error.response.status === 401) {
        handleResponse(error.response);
    }
    return Promise.reject(error);
});

// Modified fetcher to handle GET and POST requests with optional payload and token
const fetcher = async (url, payload, token) => {
    const options = {
        method: payload ? "POST" : "GET",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            ...(token && {Authorization: `Bearer ${token}`})
        },
        ...(payload && {data: payload})
    };

    try {
        const response = await axiosInstance.request({
            url,
            ...options
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Fetcher for OPTIONS requests
const optionsFetcher = (url) => axiosInstance.options(url).then((res) => res.data);

export {axiosInstance, fetcher, optionsFetcher};
export default axiosInstance;
