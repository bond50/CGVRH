import React from "react";
import useCat from "../../hooks/usecat";

const BlogCategory = () => {
    const {
        newTagFom, mouseMoveHandler, showCategories, showRemoved, showSuccess, showError
    } = useCat('categories', 'category', 'Blog category')

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

export default BlogCategory;
