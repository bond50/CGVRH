import {handleResponse} from "./auth";
import {API} from "../config";
import fetch from "isomorphic-fetch";


export const singleProject = (slug) => {
    return fetch(`${API}/project/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listProjects = () => {
    let listEndpoint = `${API}/projects`

    return fetch(`${listEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




export const removeProject = (slug, token) => {

    return fetch(`${API}/project/${slug}`, {
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





export const updateProject = (project, token, slug) => {

    return fetch(`${API}/project/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: project
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};



