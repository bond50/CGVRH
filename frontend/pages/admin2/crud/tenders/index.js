import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const TenderRead = dynamic(() => import('../../../../components/crud/tender-read'), { ssr: false, loading: () => <Preloader /> });

const Upload = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Manage Tenders | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Manage Tenders">
                <Admin>
                    <TenderRead />
                </Admin>
            </Layout>
        </>
    );
};

export default Upload;
