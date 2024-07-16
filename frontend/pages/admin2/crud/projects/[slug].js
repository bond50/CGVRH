import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const ProjectUpdate = dynamic(() => import('../../../../components/crud/project-update'), { ssr: false, loading: () => <Preloader /> });

const Update = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Update Project | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Update project">
                <Admin>
                    <ProjectUpdate />
                </Admin>
            </Layout>
        </>
    );
};

export default Update;
