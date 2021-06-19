import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API} from "../../config";

export const FetchImages = () => {
    const [values, setValues] = useState({loading: false,});
    const [data, setData] = useState([]);

    const loadImages = () => {
        setValues({...values, loading: true});
        axios
            .get(`${API}/files-retrieve`)
            .then((response) => {
                setData(response.data);
                setValues({...values, loading: false});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadImages();
    }, []);

    const {loading} = values;

    if (loading) {
        return (
            <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );

    } else {
        return data
    }

};











