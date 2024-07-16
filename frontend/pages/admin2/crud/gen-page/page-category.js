import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const PageCategory = dynamic(() => import('../../../../components/crud/page-category'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });

const ManageCategoriesTags = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Manage Categories and Tags | {APP_NAME}</title>
            </Head>
            <Layout pageTitle='Manage Categories and Tags'>
                <Admin>
                    <PageCategory />
                </Admin>
            </Layout>
        </>
    );
};

export default ManageCategoriesTags;
