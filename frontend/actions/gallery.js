import {API} from "../config";
import axios from "axios";
import fetch from "isomorphic-fetch";


// export const getFilesFromCloud = async () => {
//     return await axios.get(`${API}/files-retrieve-from-cloud`)
//         .then(({data}) => {
//             return data
//         }).catch(error => console.log(error))
// };
//

export const getFilesFromLocal = async () => {
    return await axios.get(`${API}/get-all-multiple-files`)
        .then(({data}) => {
            return data
        }).catch(error => console.log(error))
};


export const getFilesFromCloud = async (folder) => {
  const data = {
        folder
    };

    return fetch(`${API}/files-retrieve-from-cloud`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};
