import React from "react";
import useCat from "../../hooks/useCat";

const PageCategory = () => {
    const {
        newTagFom, mouseMoveHandler, showCategories, showRemoved, showSuccess, showError
    } = useCat('page-cats', 'page-cat', 'Page category')

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

export default PageCategory;
