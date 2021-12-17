import React from 'react';
import useTag from "../../hooks/useTag";

const BlogTag = () => {
    const {
        newTagFom,
        mouseMoveHandler,
        showSuccess,
        showTags,
        showError,
        showRemoved
    } = useTag('tags', 'tag', 'Blog Tag')

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