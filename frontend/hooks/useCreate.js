import { useEffect, useState } from "react";
import { dataFromLocalStorage, setDataToLocalStorage } from "../components/reusables/functions/dataFromLocalStorage";
import { getCookie } from "../actions/auth";
import { useRouter } from "next/router";
import useFCT from "./useFCT";
import { createAction } from "../components/reusables/functions/createAction";
import axios from "axios";
import { API } from "../config";

const useCreate = (localStorageItem, catEndpoint, tagEndpoint, pageEndpoint) => {
    const router = useRouter();
    const token = getCookie('token');

    // Categories and Tags state
    const [checked, setChecked] = useState([]); // Categories
    const [checkedTag, setCheckedTag] = useState([]); // Tags

    // Form and body state
    const [body, setBody] = useState(dataFromLocalStorage(localStorageItem));
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        images: [],
        title: '',
        hidePublishButton: false,
        checkedService: false,
        keywords: '',
        postToSocialMedia: false
    });
    const { error, success, title, images, checkedService, keywords, postToSocialMedia } = values;

    const [loading, setLoading] = useState(false);

    const { data: categories } = useFCT(catEndpoint);
    const { data: tags } = tagEndpoint !== null && useFCT(tagEndpoint);

    useEffect(() => {
        setValues((prevValues) => ({
            ...prevValues,
            body: dataFromLocalStorage(localStorageItem)
        }));
    }, [router, localStorageItem, catEndpoint, tagEndpoint, pageEndpoint]);

    const publish = async (e) => {
        e.preventDefault();
        const payload = {
            ...values,
            body,
            categories: checked,
            tags: checkedTag,
        };




        try {
            const data = await createAction(payload, token, pageEndpoint);
            if (data.error) {
                setValues((prevValues) => ({ ...prevValues, error: data.error }));
            } else {
                setValues((prevValues) => ({
                    ...prevValues,
                    title: '',
                    error: '',
                    success: `A new item titled "${data.title}" is created`
                }));
                setBody('');
            }
        } catch (err) {
            console.error("Error creating blog:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        const actualValue = type === 'checkbox' ? checked : (files ? files[0] : value);
        setValues((prevValues) => ({ ...prevValues, [name]: actualValue, error: '' }));
    };

    const handleBody = (content) => {
        setBody(content);
        setValues((prevValues) => ({ ...prevValues, body: content }));
        setDataToLocalStorage(localStorageItem, content);
    };

    const handleToggle = (c) => () => {
        setValues((prevValues) => ({ ...prevValues, error: '' }));
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        setChecked(all);
    };

    const handleTagsToggle = (tag) => {
        setValues((prevValues) => ({ ...prevValues, error: '' }));
        const clickedTag = checkedTag.indexOf(tag);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(tag);
        } else {
            all.splice(clickedTag, 1);
        }
        setCheckedTag(all);
    };

    const removeImage = async (id) => {
        setLoading(true);
        try {
            await axios.post(`${API}/remove-image`, { public_id: id }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const filteredImages = values.images.filter((image) => image.public_id !== id);
            setValues((prevValues) => ({ ...prevValues, images: filteredImages }));
        } catch (err) {
            console.error("Error removing image:", err);
        } finally {
            setLoading(false);
        }
    };

    const showCategories = () => {
        return categories && categories.map((c, i) => (
            <label key={i} className="list-group-item border-0">
                <input onChange={handleToggle(c._id)} type="checkbox" className="form-check-input me-1" />
                {c.name}
            </label>
        ));
    };

    const getFeaturedServices = () => {
        return (
            <label className="list-group-item border-0">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    name="checkedService"
                    checked={checkedService}
                    className="form-check-input me-1" />
                Featured
            </label>
        );
    };

    const showTags = () => {
        return tags && tags.map((t, i) => (
            <label key={i} className="list-group-item border-0">
                <input onChange={() => handleTagsToggle(t._id)} type="checkbox" className="form-check-input me-1" />
                {t.name}
            </label>
        ));
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
        setBody,
        getFeaturedServices,
        error,
        success,
        images,
        values,
        setValues,
        title,
        body,
        postToSocialMedia,
        keywords
    };
};

export default useCreate;
