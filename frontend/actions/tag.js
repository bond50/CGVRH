import axiosInstance from '../axios/axios';
import {handleResponse} from "./auth";

export const create = (tag, token, endpoint) => {
    return axiosInstance.post(`${endpoint}`, tag)
        .then(response => {
            handleResponse(response);
            return response.data;
        })
        .catch(err => console.log(err));
};

export const getTags = (endPoint) => {
    return axiosInstance.get(`/${endPoint}`)
        .then(response => response.data)
        .catch(err => console.log(err));
};

export const singleTag = (slug, endpoint) => {
    return axiosInstance.get(`/${endpoint}/${slug}`)
        .then(response => response.data)
        .catch(err => console.log(err));
};

export const removeTag = (slug, token, endpoint) => {
    return axiosInstance.delete(`/${endpoint}/${slug}`)
        .then(response => {
            handleResponse(response);
            return response.data;
        })
        .catch(err => console.log(err));
};

export const getAllTagSlugs = async () => {
    try {
        const response = await axiosInstance.get(`/tags`, );
        return response.data.map(tag => ({
            params: {slug: tag.slug}
        }));
    } catch (err) {
        console.log(err);
        return [];
    }
};
