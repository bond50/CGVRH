import React, {useEffect, useState} from 'react';
import {getCookie} from "../actions/auth";
import {create, getCategories, removeCategory} from "../actions/category";
import TagCategoryForm from "../components/reusables/forms/TagCategoryForm";

const UseCat = (fetchAllEndpoint, singleEndpoint, formLabel) => {

    const [values, setValues] = useState({
        name: "",
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false,
    });

    const {name, error, success, categories, removed, reload} = values;
    const token = getCookie("token");

    useEffect(() => {
        loadCategories();
    }, [reload, fetchAllEndpoint, singleEndpoint]);

    const loadCategories = () => {
        getCategories(fetchAllEndpoint).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({...values, categories: data});
            }
        });
    };


    const showCategories = () => {
        return categories.map((c, i) => {
            return (
                <button
                    onDoubleClick={() => deleteConfirm(c.slug)}
                    title="Double click to delete"
                    key={i}
                    className="btn btn-outline-primary mx-1 mt-3"
                >
                    {c.name}
                </button>
            );
        });
    };

    const deleteConfirm = (slug) => {
        let answer = window.confirm(
            "Are you sure you want to delete this category?"
        );
        if (answer) {
            deleteCategory(slug);
        }
    };

    const deleteCategory = (slug) => {
        // console.log('delete', slug);
        removeCategory(slug, token, singleEndpoint).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({
                    ...values,
                    error: false,
                    success: false,
                    name: "",
                    removed: !removed,
                    reload: !reload,
                });
            }
        });
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        // console.log('create category', name);
        create({name}, token, singleEndpoint).then((data) => {
            if (data.error) {
                setValues({...values, error: data.error, success: false});
            } else {
                setValues({
                    ...values,
                    error: false,
                    success: true,
                    name: "",
                    reload: !reload,
                });
            }
        });
    };

    const handleChange = (e) => {
        setValues({
            ...values,
            name: e.target.value,
            error: false,
            success: false,
            removed: "",
        });
    };

    const showSuccess = () => {
        if (success) {
            return <p className="text-success">Category is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">Category already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Category is removed</p>;
        }
    };

    const mouseMoveHandler = (e) => {
        setValues({...values, error: false, success: false, removed: ""});
    };
    const newTagFom = () => (
        <TagCategoryForm
            value={name}
            handleChange={handleChange}
            label={formLabel}
            clickSubmit={clickSubmit}/>
    );


    return {newTagFom, mouseMoveHandler, showCategories, showRemoved, showSuccess, showError}
};

export default UseCat;