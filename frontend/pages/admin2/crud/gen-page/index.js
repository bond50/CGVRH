import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const PageCreate = dynamic(() => import('../../../../components/crud/PageCreate'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });

const CreateNewPage = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Create a New Page | {APP_NAME}</title>
            </Head>
            <Layout pageTitle='Create a New Page'>
                <Admin>
                    <PageCreate />
                </Admin>
            </Layout>
        </>
    );
};

export default CreateNewPage;
