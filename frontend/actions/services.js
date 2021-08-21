import {handleResponse, isAuth} from "./auth";
import {API} from "../config";
import fetch from "isomorphic-fetch";

export const createService = (service, token) => {
    let serviceEndpoint

    if (isAuth() && isAuth().role === 1) {
        serviceEndpoint = `${API}/service`
    } else if (isAuth() && isAuth().role === 0) {
        serviceEndpoint = `${API}/user/service`
    }

    return fetch(`${serviceEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: service
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const list = (username) => {
    let listServiceEndpoint
    if (username) {
        listServiceEndpoint = `${API}/${username}/services`
    } else {
        listServiceEndpoint = `${API}/services`
    }

    return fetch(`${API}/services`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const listServicesWithCategoriesAndTags = () => {
    return fetch(`${API}/services-categories-tags`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleService = (slug) => {
    return fetch(`${API}/service/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const listFeaturedServices = (limit) => {
    return fetch(`${API}/featured-services`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(limit)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const fetcher = async (payload, url) => {
    const options = {
        method: payload ? "POST" : "GET",
        ...(payload && {body: payload}),
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    return fetch(url, options).then(r => r.json());

};