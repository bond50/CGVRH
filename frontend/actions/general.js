import { handleResponse, isAuth } from "./auth";
import axiosInstance from '../axios/axios';

export const singlePage = (slug) => {
    return axiosInstance.get(`/general/${slug}`)
        .then(response => response.data)
        .catch(err => console.log(err));
};

export const list = (username) => {
    let listEndpoint;
    if (username) {
        listEndpoint = `/${username}/general`;
    } else {
        listEndpoint = '/general';
    }
    return axiosInstance.get(listEndpoint)
        .then(response => response.data)
        .catch(err => console.log('ERROR', err));
};

export const listWithPagination = (page, limit) => {
    const queryParams = `?page=${page}&limit=${limit}`;
    return axiosInstance.get(`/services${queryParams}`)
        .then(response => response.data)
        .catch(err => console.log(err));
};

export const removePage = (slug, token) => {
    let deleteEndpoint;
    if (isAuth() && isAuth().role === 1) {
        deleteEndpoint = `/general/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteEndpoint = `/user/general/${slug}`;
    }

    return axiosInstance.delete(deleteEndpoint, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        handleResponse(response);
        return response.data;
    })
    .catch(err => console.log(err));
};

export const listRelated = (page) => {
    return axiosInstance.post('/general/related', page)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const updatePage = (page, token, slug) => {
    let updateEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateEndpoint = `/general/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateEndpoint = `/user/general/${slug}`;
    }

    return axiosInstance.put(updateEndpoint, page, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        handleResponse(response);
        return response.data;
    })
    .catch(err => console.log(err));
};

export const getAllSlugs = () => {
    return axiosInstance.get('/general/slugs')
        .then(response => response.data.slugs)
        .catch(err => {
            console.log(err);
            return [];
        });
};
