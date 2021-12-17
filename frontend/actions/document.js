import fetch from "isomorphic-fetch";
import {API} from "../config";

export const listDocumentAndTags = () => {
    return fetch(`${API}/documents-tags`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
