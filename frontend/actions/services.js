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
