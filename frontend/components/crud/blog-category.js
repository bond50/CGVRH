import React from "react";
import useCat from "../../hooks/useCat";
import TagCategoryForm from "../reusables/forms/TagCategoryForm";

const BlogCategory = () => {
    const {
        name, handleChange, clickSubmit, mouseMoveHandler, showCategories, showRemoved, showSuccess, showError
    } = useCat('categories', 'category', 'Blog category')


    return (
        <React.Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler}>
                <TagCategoryForm
                    value={name}
                    handleChange={handleChange}
                    label='Blog Categories'
                    clickSubmit={clickSubmit}/>
                {showCategories()}
            </div>
        </React.Fragment>
    );
};

export default BlogCategory;
