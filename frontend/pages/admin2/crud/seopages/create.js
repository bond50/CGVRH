import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { APP_NAME } from '../../../../config';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false });
const SEOPageCreate = dynamic(() => import('../../../../components/crud/SEOPageCreate'), { ssr: false });

const Create = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Create SEO Page | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Create SEO Page">
                <Admin>
                    <SEOPageCreate />
                </Admin>
            </Layout>
        </>
    );
};

export default Create;
