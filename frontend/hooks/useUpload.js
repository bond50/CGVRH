import React, {useState} from 'react';
import axios from "axios";
import {API} from "../config";

const useUpload = (folder) => {
    const [multipleFiles, setMultipleFiles] = useState('');

    const [values, setValues] = useState({
        successMessage: '',
        error: '',
        title: '',
        files: '',
        loading: false
    })

    const {successMessage, error, title, loading} = values

    const uploadMultipleFiles = () => {
        setValues({...values, loading: true, error: ''})
        const formData = new FormData();
        formData.append('title', title);
        formData.append('folder', folder)

        for (const file of multipleFiles) {
            formData.append('files', file)
        }


        axios.post(`${API}/files-upload`, formData)
            .then(response => {
                setValues({
                    ...values,
                    successMessage: response.data.message,
                    loading: false,
                    title: '',
                })

                setTimeout(
                    function () {
                           window.location.reload()
                    },

                    3000
                );

            })
            .catch((error) => {
                if (error.response) {
                    setValues({...values, error: error.response.data.error, loading: false})

                } else if (error.request) {
                    setValues({...values, error: error.request.data.error, loading: false})

                } else {
                    setValues({...values, loading: false})
                }
            });

    }

    const multipleFileChange = e => {
        setMultipleFiles(e.target.files)
    };
    const handleChange = e => {
        setValues({title: e.target.value})
    }

    return {successMessage, folder, error, title, loading, uploadMultipleFiles, multipleFileChange, handleChange}
};

export default useUpload