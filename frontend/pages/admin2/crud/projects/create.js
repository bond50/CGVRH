import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const ProjectCreate = dynamic(() => import('../../../../components/crud/project-create'), { ssr: false, loading: () => <Preloader /> });

const ProjectAdd = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Add A Project | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Add A project">
                <Admin>
                    <ProjectCreate />
                </Admin>
            </Layout>
        </>
    );
};

export default ProjectAdd;
