import About from "../components/home/about";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../config";
import Toolbar from "../components/navgation/Toolbar";
import React, {Fragment} from "react";
import Hero from "../components/home/Hero";
import Footer from "../components/footer/Footer";
import CoreValues from "../components/home/CoreValues";
import Clients from "../components/home/clients";
import Cta from "../components/home/cta";
import Head from "next/head";
import {useRouter} from "next/router";
import {YearsOperated} from "../components/years-operated/YearsOperated";
import LatestBlogs from "../components/home/LatestBlogs";
import FeaturedServices from "../components/home/FeaturedServices";


export default function Home() {
    const router = useRouter()


    const head = () => (
        <Head>
            <title>The {APP_NAME} </title>
            <meta name="google-site-verification" content="Kcrylmv8RWsNALOsmjyga_p6uCldee4CwnA0aMCMym4" />
            <meta
                name="description"
                content={`${APP_NAME} is a level 5 government healthcare facility located in Western part of Kenya.We've  been offering  services  for the last ${
                    YearsOperated()} years`}
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta name="robots" content="max-image-preview:large"/>
            <meta property="og:locale" content="en_US"/>

            <meta property="og:title" content={`Home page | ${APP_NAME}`}/>
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
        <Fragment>
            {head()}
            <Toolbar home/>
            <Hero/>
            <main id='main'>
                <Clients/>
                <About/>
                <LatestBlogs/>
                <Cta/>
                <FeaturedServices/>
                <CoreValues/>
                {/*<Roles/>*/}
            </main>
            <Footer/>
        </Fragment>

    )
}
