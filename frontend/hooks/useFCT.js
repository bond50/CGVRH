import React, {useEffect, useState} from 'react';
import {getCategories} from "../actions/category";
import {getTags} from "../actions/tag";
import useSWR from "swr";
import {useRouter} from "next/router";
import {API} from "../config";
import {fetcher} from "../components/reusables/functions/fetcher";


const useFCT = (endpoint) => {
    const {data, error} = useSWR(
        [
            `${API}/${endpoint}`,
        ],
        fetcher,
    )

    return {data,error}
};

export default useFCT;