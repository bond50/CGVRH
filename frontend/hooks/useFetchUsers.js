import React, {useEffect, useState} from 'react';
import axiosInstance from "../axios/axios";
import {getCookie} from "../actions/auth";
import {removeUser} from "../actions/user";

const PendingPosts = (url) => {
    const [show, setShow] = useState(false)
    const [values, setValues] = useState({
        error: false,
        loading: false,
        message: '',
        users: [],
        removed: false,
        reload: false
    });

    const {error, users, message, removed, loading, reload} = values
    useEffect(() => {
        loadUsers()
    }, [reload, url])
    const token = getCookie('token');


    function loadUsers() {
        setValues({...values, loading: true, error: false})
        axiosInstance.get(url)
            .then(response => {
                setValues({...values, users: response.data, loading: false})
            }).catch(err => {
            if (err.response.status) {
                setValues({...values, error: 'Oops! something went wrong while fetching users', loading: false})
            }
        })
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const mouseMoveHandler = e => {
        setValues({...values, error: false, removed: false});
    };

    const deleteUser = id => {
        removeUser(token, id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({...values, error: false, message: data.message, removed: !removed, reload: !reload});
                setShow(false)
            }
        });
    };

    return {
        mouseMoveHandler,
        handleShow,
        handleClose,
        deleteUser,
        show,
        loading,
        error,
        removed,
        message,
        users,

    }
};

export default PendingPosts;