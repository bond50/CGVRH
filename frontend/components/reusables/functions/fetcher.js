import fetch from "isomorphic-fetch";

export const fetcher = async (url, payload, token) => {
    const options = {
        method: payload ? "POST" : "GET",
        ...(payload && {body: payload}),
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    return fetch(url, options).then(r => r.json());

};
