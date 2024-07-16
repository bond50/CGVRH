import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const ProjectRead = dynamic(() => import('../../../../components/crud/project-read'), { ssr: false, loading: () => <Preloader /> });

const Manage = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Manage Projects | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Manage Projects">
                <Admin>
                    <ProjectRead />
                </Admin>
            </Layout>
        </>
    );
};

export default Manage;
