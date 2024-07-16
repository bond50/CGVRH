import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../config';
import Preloader from '../../../components/preloader';

const Admin = dynamic(() => import('../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const UploadFiles = dynamic(() => import('../../../components/crud/upload-files'), { ssr: false, loading: () => <Preloader /> });

const Upload = () => {
    const head = () => (
        <Head>
            <title>Upload Files | {APP_NAME}</title>
            <meta name="robots" content="noindex, nofollow" />
        </Head>
    );

    return (
        <>
            {head()}
            <Admin>
                <Layout>
                    <UploadFiles />
                </Layout>
            </Admin>
        </>
    );
};

export default Upload;
