import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { APP_NAME } from '../../../../config';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false });
const SEOPageUpdate = dynamic(() => import('../../../../components/crud/SEOPageUpdate'), { ssr: false });

const Update = ({ id }) => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Update SEO Page | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Update SEO Page">
                <Admin>
                    <SEOPageUpdate id={id} />
                </Admin>
            </Layout>
        </>
    );
};

Update.getInitialProps = ({ query }) => {
    return { id: query.id };
};

export default Update;
