import {API} from "../config";
import {handleResponse, isAuth} from "./auth";
import fetch from "isomorphic-fetch";

export const userPublicProfile = username => {
    return fetch(`${API}/user/${username}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProfile = (token) => {
    return fetch(`${API}/user/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (token, user) => {

    return fetch(`${API}/user/update`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateForAdmin = (token, user, id) => {
    return fetch(`${API}/single-user/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const removeUser = (token, id) => {
    if (isAuth() && isAuth().role === 1) {
        return fetch(`${API}/single-user/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => {
                handleResponse(response)
                return response.json();
            })
            .catch(err => console.log(err));
    }
};
