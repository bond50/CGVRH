import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const TenderUpdate = dynamic(() => import('../../../../components/crud/tender-update'), { ssr: false, loading: () => <Preloader /> });

const Tender = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Update Tender | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Update Tender">
                <Admin>
                    <TenderUpdate />
                </Admin>
            </Layout>
        </>
    );
};

export default Tender;
