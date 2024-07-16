
import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from '../../../../components/preloader';
import { APP_NAME } from '../../../../config';
import Head from "next/head";

const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const SEOCreate = dynamic(() => import('../../../../components/crud/SEOCreate'), { ssr: false, loading: () => <Preloader /> });

const CreateSEO = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Create SEO | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Create SEO">
                <Admin>
                    <SEOCreate />
                </Admin>
            </Layout>
        </>
    );
};

export default CreateSEO;
