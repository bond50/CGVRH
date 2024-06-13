import axiosInstance from "../axios/axios";

export const singleFileUpload = async (data, options) => {
    await axiosInstance.post('/single-file-upload', data, options);
};

export const getSingleFiles = async () => {
    const { data } = await axiosInstance.get('/get-all-single-files');
    return data;
};

export const multipleFileUpload = async (data, options) => {
    await axiosInstance.post('/files-upload', data, options);
};

export const getDownloads = async () => {
    const { data } = await axiosInstance.get('/get-downloads');
    return data;
};

export const getGallery = async () => {
    const { data } = await axiosInstance.get('/get-gallery');
    return data;
};
