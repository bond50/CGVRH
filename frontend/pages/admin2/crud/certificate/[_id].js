import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const CertUpdate = dynamic(() => import('../../../../components/crud/certificate/CertUpdate'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });

const UpdateCertificate = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Update a Certificate | {APP_NAME}</title>
            </Head>
            <Layout pageTitle='Update a Certificate'>
                <Admin>
                    <CertUpdate />
                </Admin>
            </Layout>
        </>
    );
};

export default UpdateCertificate;
