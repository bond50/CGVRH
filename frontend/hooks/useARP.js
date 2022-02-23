import React, {useEffect, useState} from 'react';
import axiosInstance from "../axios/axios";
import {getCookie} from "../actions/auth";
import {removeBlog} from "../actions/blog";
import {removePage} from "../actions/general";


const UseARP = (url) => {
    const [values, setValues] = useState({
        error: false,
        loading: false,
        message: '',
        data: [],
        removed: false,
        reload: false
    });

    const {error, data, message, removed, loading, reload} = values
    useEffect(() => {
        if (url) {
            loadData()
        }
    }, [reload, url])
    const token = getCookie('token');

    function loadData() {
        setValues({...values, loading: true, error: false})
        axiosInstance.get(url)
            .then(response => {
                setValues({...values, data: response.data, loading: false})
            })
            .catch(err => {
                if (err.response.status) {
                    setValues({...values, error: 'Oops! something went wrong while fetching data', loading: false})
                }
            })
    }


    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({...values, error: false, message: data.message, removed: !removed, reload: !reload});
            }
        });
    };

    const deletePage = slug => {
        removePage(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({...values, error: false, message: data.message, removed: !removed, reload: !reload});
            }
        });
    };

    const mouseMoveHandler = e => {
        setValues({...values, error: false, removed: false});
    };

    function deleteBlogConfirm(slug, title) {
        let answer = window.confirm(`Are you sure you want to delete ${title}`)
        if (answer) {
            deleteBlog(slug)
        }
    }


    function deleteConfirm(slug, title) {
        let answer = window.confirm(`Are you sure you want to delete ${title}`)
        if (answer) {
            deletePage(slug)
        }
    }


    return {
        mouseMoveHandler,
        deleteBlogConfirm,
        deleteConfirm,
        loading,
        error,
        data,
        removed,
        message,

    }
};

export default UseARP;