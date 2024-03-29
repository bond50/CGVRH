import React from "react";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../config";
import {YearsOperated} from "../components/years-operated/YearsOperated";
import {useRouter} from "next/router";
import dynamic from 'next/dynamic'
import Layout from "../hoc/Layout";
import WhyUs from "../components/home/why-us";
import HomeCounter from "../components/home/home-counter";

const About = dynamic(() => import(  "../components/home/about"), {ssr: false,});
const Clients = dynamic(() => import(  "../components/home/clients"), {ssr: false,});
const Cta = dynamic(() => import( "../components/home/cta"), {ssr: false,});
const Head = dynamic(() => import( "next/head"), {ssr: false,});
const LatestBlogs = dynamic(() => import(  "../components/home/recent/LatestBlogs"), {ssr: false});
const FeaturedServices = dynamic(() => import(  "../components/home/FeaturedServices"), {ssr: false});
const Gallery = dynamic(() => import(  "../components/home/home-gallery/HomeGallery"), {ssr: false,});


export default function Home() {
    const router = useRouter()

    const head = () => (
        <Head>
            <title>{APP_NAME} </title>
            <meta name="google-site-verification" content="Kcrylmv8RWsNALOsmjyga_p6uCldee4CwnA0aMCMym4"/>
            <meta
                name="description"
                content={`${APP_NAME} is a level 5 government healthcare facility located in Western part of Kenya.We've  been offering  services  for the last ${
                    YearsOperated()} years`}
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta name="robots" content="max-image-preview:large"/>
            <meta property="og:locale" content="en_US"/>

            <meta property="og:title" content={`${APP_NAME}`}/>
            <meta
                property="og:description"
                content={`${APP_NAME} is a level 5 government healthcare facility located in Western part of Kenya.We've  been offering  services  for the last ${
                    YearsOperated()} years`}
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
            <Layout home>

                <WhyUs/>
                {/*<CoreValues/>*/}

                <Clients/>
                <HomeCounter/>

                <About/>
                <Gallery/>
                <FeaturedServices/>
                <Cta/>
                <LatestBlogs/>


                {/*<Roles/>*/}
            </Layout>
        </>

    )
}
