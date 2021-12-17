import React from 'react';


import useTag from "../../hooks/useTag";

const Tag = () => {
    const {
        newTagFom,
        mouseMoveHandler,
        showSuccess,
        showTags,
        showError,
        showRemoved
    } = useTag('service-tags', 'service-tag', 'Service Tag')


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

export default Tag;