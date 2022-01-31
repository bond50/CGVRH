import React from 'react';
import useTag from "../../hooks/useTag";
import TagCategoryForm from "../reusables/forms/TagCategoryForm";

const BlogTag = () => {
    const {
        name,
        handleChange,
        formLabel,
        clickSubmit,
        mouseMoveHandler,
        showSuccess,
        showTags,
        showError,
        showRemoved
    } = useTag('tags', 'tag', 'Blog Tag')


    const newTagFom = () => (
        <TagCategoryForm
            value={name}
            handleChange={handleChange}
            label={formLabel}
            clickSubmit={clickSubmit}/>
    );
    return (
        <React.Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler}>
                {newTagFom()}
                {showTags()}
            </div>
        </React.Fragment>
    );
};

export default BlogTag;