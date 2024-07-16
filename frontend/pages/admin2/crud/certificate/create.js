import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const CertCreate = dynamic(() => import('../../../../components/crud/certificate/CertCreate'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });

const GenerateCertificate = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Generate a New Certificate | {APP_NAME}</title>
            </Head>
            <Layout pageTitle='Generate a New Certificate'>
                <Admin>
                    <CertCreate />
                </Admin>
            </Layout>
        </>
    );
};

export default GenerateCertificate;
