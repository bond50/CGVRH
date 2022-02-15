import React, {useEffect, useState} from 'react';
import axiosInstance from "../axios/axios";
import {getCookie} from "../actions/auth";
import {removeBlog} from "../actions/blog";
import {removePage} from "../actions/general";

const PendingPosts = (url) => {
    const [show, setShow] = useState(false)
    const [values, setValues] = useState({
        error: false,
        loading: false,
        message: '',
        blogs: [],
        removed: false,
        reload: false
    });

    const {error, blogs, message, removed, loading, reload} = values
    useEffect(() => {
        if (url) {
            loadBogs()
        }
    }, [reload, url])
    const token = getCookie('token');

    function loadBogs() {
        setValues({...values, loading: true, error: false})
        axiosInstance.get(url)
            .then(response => {
                setValues({...values, blogs: response.data, loading: false})
            })
            .catch(err => {
                if (err.response.status) {
                    setValues({...values, error: 'Oops! something went wrong while fetching blogs', loading: false})
                }
            })
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({...values, error: false, message: data.message, removed: !removed, reload: !reload});
                setShow(false)
            }
        });
    };

    const deletePage = slug => {
        removePage(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({...values, error: false, message: data.message, removed: !removed, reload: !reload});
                setShow(false)
            }
        });
    };

    const mouseMoveHandler = e => {
        setValues({...values, error: false, removed: false});
    };


    return {
        mouseMoveHandler,
        deleteBlog,
        deletePage,
        handleShow,
        handleClose,
        show,
        loading,
        error,
        blogs,
        removed,
        message,


    }
};

export default PendingPosts;