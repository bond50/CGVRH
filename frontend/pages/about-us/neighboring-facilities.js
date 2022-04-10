import Layout from "../../hoc/Layout";
import Neighbor from "../../components/about/Neighbor";
import React from 'react'
import {useRouter} from "next/router";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";

const Index = () => {
    const router = useRouter()
    const head = () => (
        <Head>
            <title>Neighboring facilities| {APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga County Referral Hospital Neighboring facilities"
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`Neighboring facilities | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content="Neighboring facilities"
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
                <Neighbor/>
            </Layout>
        </>

    );
};

export default Index;
