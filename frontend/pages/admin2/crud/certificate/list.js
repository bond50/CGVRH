import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const CertRead = dynamic(() => import('../../../../components/crud/certificate/CertRead'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });

const ManageCertificates = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Manage Certificates | {APP_NAME}</title>
            </Head>
            <Layout pageTitle='Manage Certificates'>
                <Admin>
                    <CertRead />
                </Admin>
            </Layout>
        </>
    );
};

export default ManageCertificates;
