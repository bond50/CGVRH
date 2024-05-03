// actions/certificate.js
import axios from 'axios';
import {API} from '../config';

export const list = () => {
    return axios.get(`${API}/certificates`)
        .then(response => response.data)
        .catch(error => {
            return {error: error.response?.data?.error || 'An error occurred.'};
        });
};

export const listByUser = (username) => {
    return axios.get(`${API}/user/certificates`)
        .then(response => response.data)
        .catch(error => {
            return {error: error.response?.data?.error || 'An error occurred.'};
        });
};
export const removeCertificate = (id, token) => {
    return axios.delete(`${API}/certificate/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
    }).then(response => response.data)
     .catch(error => ({error: error.response?.data?.error || 'Failed to delete certificate.'}));
};