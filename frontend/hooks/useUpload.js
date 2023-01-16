import React, {useState} from 'react';
import axiosInstance from "../axios/axios";
import useFCT from "./useFCT";


const useUpload = (folder, tagEndpoint, url) => {
    const [multipleFiles, setMultipleFiles] = useState('');
    const [checkedTag, setCheckedTag] = useState([]);
    const [values, setValues] = useState({
        successMessage: '',
        error: '',
        title: '',
        loading: false
    })

    const {data: loadedTags, error: tagError} = useFCT(tagEndpoint)
    const {successMessage, error, title, loading} = values


    const uploadMultipleFiles = () => {
        setValues({...values, loading: true, error: ''})
        const formData = new FormData();
        formData.append('title', title);
        formData.append('folder', folder)
        formData.append('tags', checkedTag)


        for (const file of multipleFiles) {
            formData.append('files', file)
        }


        axiosInstance.post(url, formData)
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


    const handleTagsToggle = tag => {
        const clickedTag = checkedTag.indexOf(tag);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(tag);
        } else {
            all.splice(clickedTag, 1);
        }
        setCheckedTag(all);
    };


    return {
        successMessage,
        folder,
        error,
        title,
        loading,
        loadedTags,
        handleTagsToggle,
        uploadMultipleFiles,
        multipleFileChange,
        handleChange
    }
};

export default useUpload