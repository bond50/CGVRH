import React from 'react'
import Layout from "../../hoc/Layout";
import Organogram from "../../components/about/Organogram";
import {useRouter} from "next/router";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";

const Index = () => {
    const router = useRouter()
    const head = () => (
        <Head>
            <title>Organisation structure | {APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga County Referral Hospital Organisation structure"
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`Organisation structure | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content="Organisation structure"
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
                <Organogram/>
            </Layout>
        </>

    );
};

export default Index;
