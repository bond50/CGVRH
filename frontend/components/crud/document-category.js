import React from "react";
import useCat from "../../hooks/useCat";

const Category = () => {
    const {
        newTagFom,
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
                {newTagFom()}
                {showCategories()}
            </div>
        </React.Fragment>
    );
};

export default Category;
