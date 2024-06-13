// actions/certificate.js
import axiosInstance from '../axios/axios';

export const list = () => {
    return axiosInstance.get('/certificates')
        .then(response => response.data)
        .catch(error => {
            return { error: error.response?.data?.error || 'An error occurred.' };
        });
};

export const listByUser = (username) => {
    return axiosInstance.get(`/user/certificates`)
        .then(response => response.data)
        .catch(error => {
            return { error: error.response?.data?.error || 'An error occurred.' };
        });
};

export const removeCertificate = (id, token) => {
    return axiosInstance.delete(`/certificate/${id}`, )
    .then(response => response.data)
    .catch(error => ({ error: error.response?.data?.error || 'Failed to delete certificate.' }));
};
