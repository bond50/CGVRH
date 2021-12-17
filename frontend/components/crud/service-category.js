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
    } = useCat('service-categories', 'service-category', 'Service category')


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
