import {handleResponse, isAuth} from "./auth";
import {API} from "../config";
import fetch from "isomorphic-fetch";


export const singlePage = (slug) => {
    return fetch(`${API}/general/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = (username) => {
    let listEndpoint
    if (username) {
        listEndpoint = `${API}/${username}/general`
    } else {
        listEndpoint = `${API}/general`
    }


    return fetch(`${listEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const removePage = (slug, token) => {
    let deleteEndpoint
    if (isAuth() && isAuth().role === 1) {
        deleteEndpoint = `${API}/general/${slug}`
    } else if (isAuth() && isAuth().role === 0) {
        deleteEndpoint = `${API}/user/general/${slug}`
    }

    return fetch(`${deleteEndpoint}`, {
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
};


export const listRelated = (page) => {
    return fetch(`${API}/general/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(page)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updatePage = (page, token, slug) => {
    let updateEndpoint

    if (isAuth() && isAuth().role === 1) {
        updateEndpoint = `${API}/general/${slug}`

    } else if (isAuth() && isAuth().role === 0) {
        updateEndpoint = `${API}/user/general/${slug}`
    }


    return fetch(`${updateEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: page
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

