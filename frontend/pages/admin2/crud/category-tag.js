import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../config';
import Preloader from '../../../components/preloader';

const Admin = dynamic(() => import('../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const BlogCategory = dynamic(() => import('../../../components/crud/blog-category'), { ssr: false, loading: () => <Preloader /> });
const BlogTag = dynamic(() => import('../../../components/crud/blog-tag'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });

const CategoryTag = () => {
    const head = () => (
        <Head>
            <title>Manage Categories and Tags | {APP_NAME}</title>
            <meta name="robots" content="noindex, nofollow" />
        </Head>
    );

    return (
        <>
            {head()}
            <Admin>
                <Layout pageTitle="Manage Categories and Tags">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <BlogCategory />
                            </div>
                            <div className="col-md-6">
                                <BlogTag />
                            </div>
                        </div>
                    </div>
                </Layout>
            </Admin>
        </>
    );
};

export default CategoryTag;
