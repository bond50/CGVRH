import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API} from "../config";
import {useRouter} from "next/router";
import useFCT from "./useFCT";

const useUpload = () => {
    const router = useRouter()
    const [multipleFiles, setMultipleFiles] = useState('');
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    const [values, setValues] = useState({
        successMessage: '',
        error: '',
        title: '',
        files: '',
        formData: {},
        loading: false
    })


    const {successMessage, error, formData, title, loading,} = values


    const {data: categories, error: catError} = useFCT('document-categories')
    const {data: tags, error: tagError} = useFCT('document-tags')

    useEffect(() => {
        let componentMounted = true;
        setValues({
            ...values,
            formData: new FormData(), // <-- valid formData object after initial render
        });
        return () => {
            componentMounted = false;
        }
    }, [router])


    const handleToggle = c => () => {
        setValues({...values, error: ''});
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        setChecked(all);
        console.log(all)
        formData.append('categories', all);
    };

    const handleTagsToggle = tag => {
        setValues({...values, error: ''});
        // return the first index or -1
        const clickedTag = checkedTag.indexOf(tag);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(tag);
        } else {
            all.splice(clickedTag, 1);
        }
        setCheckedTag(all);
        console.log(all)

        formData.append('tags', all);
    };


    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <label key={i} className="list-group-item border-0">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="form-check-input me-1"/>
                    {c.name}
                </label>
            ))
        );
    };

    const showTags = () => {
        return (
            tags && tags.map((t, i) => (
                <label key={i} className="list-group-item border-0">
                    <input onChange={() => handleTagsToggle(t._id)} type="checkbox" className="form-check-input me-1"/>
                    {t.name}
                </label>
            ))
        );
    };

    const UploadMultipleFiles = () => {
        setValues({...values, loading: true, error: ''})
          formData.append('title', title);
        for (const file of multipleFiles) {
            formData.append('files', file)
        }


        axios.post(`${API}/document-create`, formData)
            .then(response => {
                setValues({
                    ...values,
                    successMessage: response.data.message,
                    loading: false,
                    title: '',
                })
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
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

    const handleChange = name => e => {
        setValues({...values, [name]: e.target.value,  error: ''});
    };

    const MultipleFileChange = e => {
        setMultipleFiles(e.target.files)
    };


    return {showCategories, showTags, MultipleFileChange,error,successMessage, loading, handleChange,title, UploadMultipleFiles};
};

export default useUpload;