import axiosInstance from '../axios/axios';
import { handleResponse } from "./auth";

export const create = (category, endpoint) => {
    return axiosInstance.post(`/${endpoint}`, category)
    .then(response => {
        handleResponse(response);
        return response.data;
    })
    .catch(err => console.log(err));
};

export const getCategories = (endPoint) => {
    return axiosInstance.get(`/${endPoint}`)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const singleCategory = (slug, endpoint) => {
    return axiosInstance.get(`/${endpoint}/${slug}`)
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const removeCategory = (slug, endpoint) => {
    return axiosInstance.delete(`/${endpoint}/${slug}`)
    .then(response => {
        handleResponse(response);
        return response.data;
    })
    .catch(err => console.log(err));
};

export const getAllCategorySlugs = async () => {
    try {
        const response = await axiosInstance.get('/categories');
        return response.data.map(category => ({
            params: { slug: category.slug }
        }));
    } catch (err) {
        console.log(err);
        return [];
    }
};
