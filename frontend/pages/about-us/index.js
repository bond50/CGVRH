import Layout from "../../hoc/Layout";
import Plan from "../../components/about/Plan";
import Partners from "../../components/about/Partners";
import React from 'react'
import Role from "../../components/about/Role";
import Goals from "../../components/about/Goals";
import GuidingPrinciples from "../../components/about/GuidingPrinciples";
import Breadcrumbs from "../../components/reusables/Breadcrumbs";
import Organogram from "../../components/about/Organogram";
import Neighbor from "../../components/about/Neighbor";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import {useRouter} from "next/router";

const Index = () => {
    const router = useRouter()
    const head = () => (
        <Head>
            <title>About us | {APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga County Referral Hospital information on Our Hospital Management, Organisation structure, Guiding principles and strategic plan"
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`About us | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content="Vihiga County Referral Hospital information on Our Hospital Management, Organisation structure, Guiding principles and strategic plan"
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
        <>{head()}
            <Layout>
                <Breadcrumbs/>
                <Organogram/>
                <Partners/>
                <Plan/>
                <GuidingPrinciples/>

                {/*<Board/>*/}
                <Role/>
                <Neighbor/>
                <Goals/>
            </Layout>
        </>
    );
};

export default Index;