import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import Head from "next/head";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import Preloader from "../../components/preloader";

const Layout = dynamic(() => import('../../hoc/Layout'), { ssr: false, loading: () => <Preloader/> });
const CoreValues = dynamic(() => import('../../components/about/CoreValues'), { ssr: false, loading: () => <Preloader/> });

const Index = () => {
    const router = useRouter();
    const head = () => (
        <Head>
            <title>Core values, Mission and Vision | {APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga County Referral Hospital Core values, Mission and Vision"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Core values, Mission and Vision | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Core values, Mission and Vision"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`/herp.jpg`} />
            <meta property="og:image:secure_url" content={`/herp.jpg`} />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    return (
        <>
            {head()}
            <Layout>
                <CoreValues />
            </Layout>
        </>
    );
};

export default Index;
