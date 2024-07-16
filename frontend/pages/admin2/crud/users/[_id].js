import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Preloader from '../../../../components/preloader';

const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const UserUpdateComponent = dynamic(() => import('../../../../components/auth/user-update-component'), { ssr: false, loading: () => <Preloader /> });

const Slug = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Admin>
                <Layout>
                    <UserUpdateComponent id={router.query._id} />
                </Layout>
            </Admin>
        </>
    );
};

export default Slug;
