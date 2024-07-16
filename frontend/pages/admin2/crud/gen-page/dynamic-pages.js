import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const PageRead = dynamic(() => import('../../../../components/crud/PageRead'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });

const ManageDynamicPages = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Manage Dynamic Pages | {APP_NAME}</title>
            </Head>
            <Layout pageTitle='Manage Dynamic pages'>
                <Admin>
                    <PageRead />
                </Admin>
            </Layout>
        </>
    );
};

export default ManageDynamicPages;
