import axios from "axios";
import {API} from "../config";


export const singleFileUpload = async (data, options) => {
    try {
        await axios.post(`${API}/single-file-upload`, data, options)
    } catch (e) {
        throw e

    }
};

export const getSingleFiles = async () => {
    try {
        const {data} = await axios.get(`${API}/get-all-single-files`)
        return data
    } catch (e) {
        throw e
    }
};

export const multipleFileUpload = async (data, options) => {
    try {
        await axios.post(`${API}/files-upload`, data, options)
    } catch (e) {
        throw e
    }
};



export const getDownloads = async () => {
    try {
        const {data} = await axios.get(`${API}/get-downloads`)
        return data
    } catch (e) {
        throw e
    }
};
