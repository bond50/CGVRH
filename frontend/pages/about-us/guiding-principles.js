import Layout from "../../hoc/Layout";
import React from 'react'
import GuidingPrinciples from "../../components/about/GuidingPrinciples";
import {useRouter} from "next/router";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import CoreValues from "../../components/home/CoreValues";

const Index = () => {
    const router = useRouter()
    const head = () => (
        <Head>
            <title>Core values, Mission and Vision | {APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga County Referral Hospital Core values, Mission and Vision"
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`Core values, Mission and Vision | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content="Core values, Mission and Vision"
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
                <CoreValues/>
            </Layout>
        </>

    );
};

export default Index;
