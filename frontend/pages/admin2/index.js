import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { APP_NAME } from '../../config';
import Preloader from '../../components/preloader';

const Layout = dynamic(() => import('../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const Home = dynamic(() => import('../../components/admin/home/home-page'), { ssr: false, loading: () => <Preloader /> });
const Admin = dynamic(() => import('../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });

const Index = () => {
    const head = () => (
        <Head>
            <title>Restricted | {APP_NAME}</title>
            <meta name="robots" content="noindex, nofollow" />
        </Head>
    );

    return (
        <>
            {head()}
            <Admin>
                <Layout>
                    <Home />
                </Layout>
            </Admin>
        </>
    );
};

export default Index;
