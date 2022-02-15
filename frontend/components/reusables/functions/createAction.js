import {handleResponse, isAuth} from "../../../actions/auth";
import {API} from "../../../config";
import fetch from "isomorphic-fetch";

export const createAction = (body, token, pageEndpoint) => {
    let endpoint
    if (isAuth() && isAuth().role === 1) {
        endpoint = `${API}/${pageEndpoint}`
    } else if (isAuth() && isAuth().role === 0) {
        endpoint = `${API}/user/${pageEndpoint}`
    }

    return fetch(`${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};