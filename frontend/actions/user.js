import axios from '../axios/axios';
import {handleResponse, isAuth} from "./auth";

export const userPublicProfile = username => {
    return axios.get(`/user/${username}`, )
        .then(response => response.data)
        .catch(err => console.log(err));
};

export const getProfile = (token, id) => {
    let endpoint;
    if (id) {
        endpoint = `/single-user/${id}`;
    } else {
        endpoint = `/user/profile`;
    }

    return axios.get(endpoint )
        .then(response => {
            handleResponse(response);
            return response.data;
        })
        .catch(err => console.log(err));
};

export const update = (token, user, loadedId) => {
    return axios.put(`/single-user/${loadedId}`, user)
        .then(response => {
            handleResponse(response);
            return response.data;
        })
        .catch(err => console.log(err));
};

export const removeUser = (token, id) => {
    if (isAuth() && isAuth().role === 1) {
        return axios.delete(`/single-user/${id}` )
            .then(response => {
                handleResponse(response);
                return response.data;
            })
            .catch(err => console.log(err));
    }
};
