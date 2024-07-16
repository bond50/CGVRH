import React from "react";
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const PageUpdate = dynamic(() => import('../../../../components/crud/PageUpdate'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });

const UpdatePage = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Update Page | {APP_NAME}</title>
            </Head>
            <Layout>
                <Admin>
                    <PageUpdate />
                </Admin>
            </Layout>
        </>
    );
};

export default UpdatePage;
