import axiosInstance from "../axios/axios";

export const createStaff = (data) => {
    return axiosInstance().post(`/staff-info`, data, {
        headers: {
            Accept: 'application/json',
        },
    })
    .then(response => response.data)
    .catch(err => console.log(err));
};

export const list = () => {
    return axiosInstance.get(`/staff-info`)
    .then(response => response.data)
    .catch(err => console.log(err));
};
