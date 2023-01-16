import React, {useEffect, useState} from "react";
import {dataFromLocalStorage, setDataToLocalStorage} from "../components/reusables/functions/dataFromLocalStorage";
import {getCookie} from "../actions/auth";
import {useRouter} from "next/router";
import useFCT from "./useFCT";
import {createAction} from "../components/reusables/functions/createAction";
import axios from "axios";
import {API} from "../config";
import va from "simple-react-lightbox";


const useCreate = (localStorageItem, catEndpoint, tagEndpoint, pageEndpoint) => {
    const router = useRouter()
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [body, setBody] = useState(dataFromLocalStorage(localStorageItem));
    const [checkedService, setCheckedService] = useState(false);
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: {},
        images: [],
        title: '',
        hidePublishButton: false
    });


    const {error, sizeError, success, images, formData, title} = values;

    const token = getCookie('token');

    const {data: categories, error: catError} = useFCT(catEndpoint)


    const {data: tags, error: tagError} = tagEndpoint !== null && useFCT(tagEndpoint)


    useEffect(() => {
        let componentMounted = true;
        setValues({
            ...values,
            formData: new FormData(), // <-- valid formData object after initial render
        });
        return () => {
            componentMounted = false;
        }

    }, [router, localStorageItem, catEndpoint, tagEndpoint, pageEndpoint])


    const publish = e => {
        e.preventDefault();

        createAction(formData, token, pageEndpoint).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, title: '', error: '', success: `A new item titled "${data.title}" is created`});
                setBody('');
            }
        })

    };

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value, formData, error: ''});
    };


    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        setDataToLocalStorage(localStorageItem, e)
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
        formData.set('tags', all);
    };

    const removeImage = (id) => {
        setLoading(true)
        axios.post(`${API}/remove-image`, {public_id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((r) => {
                setLoading(false)
                const {images} = values

                let filteredImages = images.filter((image) => {
                    return image.public_id !== id
                })

                setValues({...values, images: filteredImages})


            }
        ).catch(e => {
            console.log(e)
            setLoading(false)
        })

    }


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

    const handleServiceChange = () => {
        setCheckedService(!checkedService)
    }


    const getFeaturedServices = () => {
        return (
            <label className="list-group-item border-0">
                <input
                    onChange={handleServiceChange}
                    type="checkbox"
                    checked={checkedService}
                    className="form-check-input me-1"/>
                Featured
                <br/>
                {JSON.stringify(checkedService)}
            </label>
        );
    }


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


    return {
        showTags,
        showCategories,
        handleTagsToggle,
        handleToggle,
        handleBody,
        handleChange,
        publish,
        removeImage,
        checked,
        checkedTag,
        loading,
        setLoading,
        checkedService,
        formData,
        setBody,
        getFeaturedServices,
        error,
        success,
        images,
        values,
        setValues,
        title,
        body
    }
}
export default useCreate;