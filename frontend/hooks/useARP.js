import React, { useEffect, useState } from 'react';
import axiosInstance from "../axios/axios";
import { getCookie } from "../actions/auth";
import { removeBlog } from "../actions/blog";
import { removePage } from "../actions/general";

const useARP = (url) => {
    const [values, setValues] = useState({
        error: false,
        loading: false,
        message: '',
        data: [],
        removed: false,
        reload: false
    });

    const { error, data, message, removed, loading, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        if (url) {
            loadData();
        }
    }, [reload, url]);

    function loadData() {
        setValues(prevValues => ({ ...prevValues, loading: true, error: false }));
        axiosInstance.get(url)
            .then(response => {
                setValues(prevValues => ({ ...prevValues, data: response.data, loading: false }));
            })
            .catch(err => {
                setValues(prevValues => ({
                    ...prevValues,
                    error: 'Oops! something went wrong while fetching data',
                    loading: false
                }));
            });
    }

    const deleteBlog = (slug) => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues(prevValues => ({
                    ...prevValues,
                    error: false,
                    message: data.message,
                    removed: !removed,
                    reload: !reload
                }));
            }
        });
    };

    const deletePage = (slug) => {
        removePage(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues(prevValues => ({
                    ...prevValues,
                    error: false,
                    message: data.message,
                    removed: !removed,
                    reload: !reload
                }));
            }
        });
    };

    const mouseMoveHandler = () => {
        setValues(prevValues => ({ ...prevValues, error: false, removed: false }));
    };

    const deleteBlogConfirm = (slug, title) => {
        const answer = window.confirm(`Are you sure you want to delete ${title}`);
        if (answer) {
            deleteBlog(slug);
        }
    };

    const deleteConfirm = (slug, title) => {
        const answer = window.confirm(`Are you sure you want to delete ${title}`);
        if (answer) {
            deletePage(slug);
        }
    };

    return {
        mouseMoveHandler,
        deleteBlogConfirm,
        deleteConfirm,
        loading,
        error,
        data,
        removed,
        message,
    };
};

export default useARP;
