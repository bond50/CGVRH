import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../config';
import Preloader from '../../../components/preloader';

const Layout = dynamic(() => import('../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const Admin = dynamic(() => import('../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const TagCategoryForm = dynamic(() => import('../../../components/reusables/forms/TagCategoryForm'), { ssr: false, loading: () => <Preloader /> });

import useTag from '../../../hooks/useTag';

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
    } = useTag('gallery-tags', 'gallery-tag', 'Gallery Tag');

    const head = () => (
        <Head>
            <title>Manage Tags | {APP_NAME}</title>
            <meta name="robots" content="noindex, nofollow" />
        </Head>
    );

    const newTagForm = () => (
        <TagCategoryForm
            value={name}
            handleChange={handleChange}
            label={formLabel}
            clickSubmit={clickSubmit}
        />
    );

    return (
        <>
            {head()}
            <Admin>
                <Layout pageTitle='Manage Tags'>
                    {showSuccess()}
                    {showError()}
                    {showRemoved()}
                    <div onMouseMove={mouseMoveHandler}>
                        {newTagForm()}
                        {showTags()}
                    </div>
                </Layout>
            </Admin>
        </>
    );
};

export default BlogTag;
