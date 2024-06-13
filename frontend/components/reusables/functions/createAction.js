import axios from 'axios';
import { handleResponse, isAuth } from "../../../actions/auth";
import { API } from "../../../config";

export const createAction = async (body, token, pageEndpoint) => {
    let endpoint;
    if (isAuth() && isAuth().role === 1) {
        endpoint = `${API}/${pageEndpoint}`;
    } else if (isAuth() && isAuth().role === 0) {
        endpoint = `${API}/user/${pageEndpoint}`;
    }

    try {
        const response = await axios.post(endpoint, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        handleResponse(response);
        return response.data;
    } catch (err) {
        console.log(err);
        if (err.response) {
            handleResponse(err.response);
            return err.response.data;
        }
    }
};
