import {createService} from "../../actions/services";
import {useRouter} from "next/router";
import React, {useState, useEffect} from 'react';

import {getCookie} from "../../actions/auth";

import {dataFromLocalStorage, setDataToLocalStorage} from "../reusables/functions/dataFromLocalStorage";
import {getTags} from "../../actions/tag";
import {getCategories} from "../../actions/category";
import CreateComponent from "../reusables/forms/CreateComponent";

const ServiceCreate = () => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [body, setBody] = useState(dataFromLocalStorage("service"));
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: {},
        title: '',
        hidePublishButton: false
    });
    const token = getCookie('token');
    const {error, sizeError, success, formData, title, hidePublishButton} = values;
    const router = useRouter()


    useEffect(() => {
        setValues({...values, formData: new FormData()});
        initCategories();
        initTags();
    }, [router]);


    const initTags = () => {
        getTags('service-tags').then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setTags(data);
            }
        });
    };

    const initCategories = () => {
        getCategories('service-categories').then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setCategories(data);
            }
        });
    };


    const handleSubmit = e => {
        e.preventDefault();
        createService(formData, token).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({
                    ...values,
                    title: '',
                    error: '',
                    success: `A new Service titled "${data.title}" is created`
                });
                setBody('');
                setCategories([]);
                setTags([]);
            }
        });
    };

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value, formData, error: ''});

    };
    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        setDataToLocalStorage('service', e)
    };

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
        formData.set('categories', all);
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

        formData.set('tags', all);

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


    return (
        <CreateComponent
            handleBody={handleBody}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            title={title}
            body={body}
            btnCapture='Create'
            categories={showCategories}
            tags={showTags}
            errorAlert={error}
            successAlert={success}/>
    );
};

export default ServiceCreate;