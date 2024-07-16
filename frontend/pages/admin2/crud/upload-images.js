import React from 'react';
import dynamic from 'next/dynamic';
import Head from "next/head";
import {APP_NAME} from "../../../config";
import Preloader from "../../../components/preloader";

const Admin = dynamic(() => import('../../../components/auth/Admin'), {ssr: false, loading: () => <Preloader/>});
const Layout = dynamic(() => import('../../../hoc/admin/layout/layout'), {ssr: false, loading: () => <Preloader/>});
const UploadImages = dynamic(() => import('../../../components/crud/upload-images'), {
    ssr: false,
    loading: () => <Preloader/>
});

const Upload = () => {
    const head = () => (
        <Head>
            <title>Image upload | {APP_NAME}</title>
            <meta name="robots" content="noindex, nofollow"/>
        </Head>
    );

    return (
        <>
            {head()}
            <Layout>
                <Admin>
                    <UploadImages/>
                </Admin>
            </Layout></>
    );
};

export default Upload;
