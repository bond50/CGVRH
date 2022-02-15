import React from 'react';
import useSWR from "swr";
import {API} from "../config";
import {fetcher} from "../components/reusables/functions/fetcher";


const useFCT = (endpoint) => {
    const {data, error} = useSWR(
        [
            `${API}/${endpoint}`,
        ],
        fetcher,
    )

    return {data, error}
};

export default useFCT;