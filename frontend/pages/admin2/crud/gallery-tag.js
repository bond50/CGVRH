import React from 'react';
import useTag from "../../../hooks/useTag";
import TagCategoryForm from "../../../components/reusables/forms/TagCategoryForm";
import Layout from "../../../hoc/admin/layout/layout";
import Admin from "../../../components/auth/Admin";
import CardDetail from "../../../components/admin/home/card-detail";

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
    } = useTag('gallery-tags', 'gallery-tag', 'Gallery Tag')


    const newTagFom = () => (
        <TagCategoryForm
            value={name}
            handleChange={handleChange}
            label={formLabel}
            clickSubmit={clickSubmit}/>
    );
    return (
        <Layout pageTitle='Manage Tags'>
            <Admin>
                {showSuccess()}
                {showError()}
                {showRemoved()}
                <div onMouseMove={mouseMoveHandler}>
                    {newTagFom()}
                    {showTags()}
                </div>
            </Admin>
        </Layout>
    );
};

export default BlogTag;