import React from "react";
import useCat from "../../hooks/useCat";
import TagCategoryForm from "../reusables/forms/TagCategoryForm";

const PageCategory = () => {
    const {
        name, handleChange, clickSubmit, mouseMoveHandler, showCategories, showRemoved, showSuccess, showError
    } = useCat('page-cats', 'page-cat', 'Page category')

    return (
        <React.Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler}>
                <TagCategoryForm
                    value={name}
                    handleChange={handleChange}
                    label='Page Categories'
                    clickSubmit={clickSubmit}/>
                {showCategories()}
            </div>
        </React.Fragment>
    );
};

export default PageCategory;
