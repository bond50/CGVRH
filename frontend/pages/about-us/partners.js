import React from 'react'
import Layout from "../../hoc/Layout";
import Partners from "../../components/about/Partners";
import {useRouter} from "next/router";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";

const Partner = () => {
    const router = useRouter()
    const head = () => (
        <Head>
            <title>Organisation structure | {APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga County Referral Hospital Partners"
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`Partners | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content="Partners"
            />

            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta
                property="og:image"
                content={`/herp.jpg`}
            />
            <meta
                property="og:image:secure_url"
                content={`/herp.jpg`}
            />
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    return (
        <>
            {head()}
            <Layout>
                <Partners/>
            </Layout>
        </>

    );
};

export default Partner;
