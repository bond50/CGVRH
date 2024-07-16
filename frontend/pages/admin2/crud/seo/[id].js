// pages/admin2/crud/seo/update/[id].js
import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from '../../../../components/preloader';
import { APP_NAME } from '../../../../config';
import { useRouter } from 'next/router';
import Head from "next/head";

const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const SEOUpdate = dynamic(() => import('../../../../components/crud/SEOUpdate'), { ssr: false, loading: () => <Preloader /> });

const UpdateSEO = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Update SEO | {APP_NAME}</title>
            </Head>
            <Layout pageTitle="Update SEO">
                <Admin>
                    {id && <SEOUpdate id={id} />}
                </Admin>
            </Layout>
        </>
    );
};

export default UpdateSEO;
