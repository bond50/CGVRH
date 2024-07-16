// pages/admin2/crud/seo/index.js
import React from 'react';
import dynamic from 'next/dynamic';

import { APP_NAME } from '../../../../config';
import Head from "next/head";
import Preloader from "../../../../components/preloader";

const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const SEORead = dynamic(() => import('../../../../components/crud/SEORead'), { ssr: false, loading: () => <Preloader /> });

const ManageSEO = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Manage SEO | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Manage SEO settings">
                <Admin>
                    <SEORead />
                </Admin>
            </Layout>
        </>
    );
};

export default ManageSEO;
