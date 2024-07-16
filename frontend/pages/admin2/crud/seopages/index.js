import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {APP_NAME} from '../../../../config';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), {ssr: false});
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), {ssr: false});
const SEOPageRead = dynamic(() => import('../../../../components/crud/SEOPageRead'), {ssr: false});

const Manage = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow"/>
                <title>Manage SEO Pages | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Manage SEO Pages">
                <Admin>
                    <SEOPageRead/>
                </Admin>
            </Layout>
        </>
    );
};

export default Manage;
