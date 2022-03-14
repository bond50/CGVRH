import React from "react";
import useCat from "../../hooks/useCat";
import TagCategoryForm from "../reusables/forms/TagCategoryForm";

const Category = () => {
    const {
        name, handleChange, clickSubmit,
        mouseMoveHandler,
        showCategories,
        showRemoved,
        showSuccess,
        showError
    } = useCat('document-categories', 'document-category', 'Document category')


    return (
        <React.Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler}>
                <TagCategoryForm
                    value={name}
                    handleChange={handleChange}
                    label='Document Categories'
                    clickSubmit={clickSubmit}/>
                {showCategories()}
            </div>
        </React.Fragment>
    );
};

export default Category;
