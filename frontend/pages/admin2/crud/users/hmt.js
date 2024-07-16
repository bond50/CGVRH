import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const SuperSignupForm = dynamic(() => import('../../../../components/auth/super-signup-form'), { ssr: false, loading: () => <Preloader /> });

const User = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Admin>
                <Layout>
                    <SuperSignupForm />
                </Layout>
            </Admin>
        </>
    );
};

export default User;
