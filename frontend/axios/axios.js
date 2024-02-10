
import axios from "axios";
import {API} from "../config";
import {getCookie} from "../actions/auth";

const token = getCookie('token');


const axiosInstance = axios.create({
    baseURL: API,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
//test
axiosInstance.interceptors.request.use((req) => {
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})
export default axiosInstance

const fetcher = ({url, method}) => axiosInstance[method](url).then((res) => res.data);
const optionsFetcher = (url) => axiosInstance.options(url).then((res) => res.data);
export { fetcher, optionsFetcher };