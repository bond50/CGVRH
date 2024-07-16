import React from 'react';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import Preloader from "../../components/preloader";

const Layout = dynamic(() => import("../../hoc/Layout"), { ssr: false, loading: () => <Preloader/> });
const Partners = dynamic(() => import("../../components/about/Partners"), { ssr: false, loading: () => <Preloader/> });

const Partner = () => {
    const router = useRouter();
    const head = () => (
        <Head>
            <title>Partners | {APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga County Referral Hospital Partners"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Partners | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Partners"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta
                property="og:image"
                content={`/herp.jpg`}
            />
            <meta
                property="og:image:secure_url"
                content={`/herp.jpg`}
            />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    return (
        <>
            {head()}
            <Layout>
                <Partners />
            </Layout>
        </>
    );
};

export default Partner;
