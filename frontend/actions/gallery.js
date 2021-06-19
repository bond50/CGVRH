import {API} from "../config";
import axios from "axios";


export const getFilesFromCloud = async () => {
    return await axios.get(`${API}/files-retrieve-from-cloud`)
        .then(({data}) => {
            return data
        }).catch(error => console.log(error))
};


export const getFilesFromLocal = async () => {
    return await axios.get(`${API}/get-all-multiple-files`)
        .then(({data}) => {
            return data
        }).catch(error => console.log(error))
};



