import { handleResponse } from "./auth";
import axiosInstance from "../axios/axios";

export const createProject = async (projectData) => {
    const response = await axiosInstance.post('/project', projectData);
    return response.data;
};

export const getProject = (slug) => {
    return axiosInstance.get(`/project/${slug}`)
        .then(response => response.data)
        .catch(err => console.log(err));
};

export const listProjects = () => {
    return axiosInstance.get('/projects')
        .then(response => response.data)
        .catch(err => console.log(err));
};

export const listFeatured = () => {
    return axiosInstance.get('/featured-all')
        .then(response => response.data)
        .catch(err => console.log(err));
};

export const removeProject = (slug) => {
    return axiosInstance.delete(`/project/${slug}`)
        .then(response => {
            handleResponse(response);
            return response.data;
        })
        .catch(err => console.log(err));
};

export const updateProject = (slug, project) => {
    return axiosInstance.put(`/project/${slug}`, project)
        .then(response => {
            handleResponse(response);
            return response.data;
        })
        .catch(err => console.log(err));
};

export const getAllProjectSlugs = () => {
    return axiosInstance.get('/project/slugs', )
    .then(response => {
        handleResponse(response);  // Optional: handle the response if needed
        return response.data.slugs;  // Assuming the response has a 'slugs' field that contains an array of slugs
    })
    .catch(err => {
        console.log(err);
        return [];
    });
};
