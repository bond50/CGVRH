import axiosInstance from "../axios/axios";

// Function to fetch a list of tenders
export const fetchTenderList = () => {
    const listTendersEndpoint = `/tenders`;
    return axiosInstance.get(listTendersEndpoint)
        .then(response => response.data)
        .catch(err => console.error(err));
};


// Function to create a new tender
export const createTender = (tenderData) => {
    const createTenderEndpoint = `/tenders`;

    return axiosInstance.post(createTenderEndpoint, tenderData)
        .then(response => response.data)
        .catch(err => console.error(err));
};

// Function to update a tender
export const updateTender = (tenderId, tenderData) => {
    const updateTenderEndpoint = `/tenders/${tenderId}`;
    return axiosInstance.put(updateTenderEndpoint, tenderData)
        .then(response => response.data)
        .catch(err => console.error(err));
};


// Function to delete a tender with Bearer token
export const deleteTender = (tenderId) => {
    return axiosInstance.delete(`/tenders/${tenderId}`)
        .then(response => response.data)
        .catch(err => console.error(err));
};
// Function to fetch a single tender by ID
export const fetchSingleTender = (tenderId) => {
    const singleTenderEndpoint = `/tenders/${tenderId}`;
    return axiosInstance.get(singleTenderEndpoint)
        .then(response => response.data)
        .catch(err => console.error(err));
};

