import fetch from 'isomorphic-fetch';
import {API} from '../config';
import queryString from 'query-string'
import {handleResponse, isAuth} from "./auth";


export const createStaff = (data) => {


    return fetch(`${API}/staff-info`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: data
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const list = () => {
    return fetch(`${API}/staff-info`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};