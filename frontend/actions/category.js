import fetch from "isomorphic-fetch";
import {API} from "../config";
import {handleResponse} from "./auth";

export const create = (category, token, endpoint) => {
    return fetch(`${API}/${endpoint}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
        .then((response) => {
            handleResponse(response);
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getCategories = (endPoint) =>
    fetch(`${API}/${endPoint}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));


export const singleCategory = (slug, endpoint) => {
    return fetch(`${API}/${endpoint}/${slug}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const removeCategory = (slug, token, endpoint) =>
    fetch(`${API}/${endpoint}/${slug}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            handleResponse(response);
            return response.json();
        })
        .catch((err) => console.log(err));
