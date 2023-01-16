import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import React from 'react'

const Layout = dynamic(() => import( "../../hoc/Layout"), {ssr: false});
const Plan = dynamic(() => import( "../../components/about/Plan"), {ssr: false});
const Partners = dynamic(() => import( "../../components/about/Partners"), {ssr: false});

const Role = dynamic(() => import( "../../components/about/Role"), {ssr: false});
const Goals = dynamic(() => import( "../../components/about/Goals"), {ssr: false});
const GuidingPrinciples = dynamic(() => import( "../../components/about/GuidingPrinciples"), {ssr: false});
const Breadcrumbs = dynamic(() => import( "../../components/reusables/Breadcrumbs"), {ssr: false});
const Organogram = dynamic(() => import( "../../components/about/Organogram"), {ssr: false});
const Neighbor = dynamic(() => import( "../../components/about/Neighbor"), {ssr: false});
const Head = dynamic(() => import( "next/head"), {ssr: false});




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