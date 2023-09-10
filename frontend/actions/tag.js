import fetch from 'isomorphic-fetch';
import {API} from '../config';
import {handleResponse} from "./auth";


export const create = (tag, token, endpoint) => {
    return fetch(`${API}/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tag)
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getTags = (endPoint) => {
    return fetch(`${API}/${endPoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// export const getSerViceTags = () => {
//     return fetch(`${API}/service-tags`, {
//         method: 'GET'
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };


export const singleTag = (slug, endpoint) => {

    return fetch(`${API}/${endpoint}/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeTag = (slug, token, endpoint) => {
    return fetch(`${API}/${endpoint}/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};



export const getAllTagSlugs = async () => {
    try {
        const response = await fetch(`${API}/tags`, {
            method: 'GET'
        });
        const data = await response.json();
        return data.map(tag => ({
            params: {slug: tag.slug}
        }));
    } catch (err) {
        console.log(err);
        return [];
    }
};

