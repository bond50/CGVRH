import About from "../components/home/about";
import FeaturedServices from "../components/home/FeaturedServices";
import LatestBlogs from "../components/home/LatestBlogs";
import useSWR from 'swr'
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../config";
import Toolbar from "../components/navgation/Toolbar";
import React, {Fragment} from "react";
import Hero from "../components/home/Hero";
import Footer from "../components/footer/Footer";
import CoreValues from "../components/home/CoreValues";
import Clients from "../components/home/clients";
import Cta from "../components/home/cta";
import Head from "next/head";
import {useRouter} from "next/router";


export default function Home() {
    const router = useRouter()
    const head = () => (
        <Head>
            <title>{APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga county referral hospital blog on our services departments wards core values strategic plan"
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta name="robots" content="max-image-preview:large"/>
            <link rel="canonical" href="https://vihigahospital.go.ke/"/>
            <meta property="og:locale" content="en_US"/>

            <meta property="og:title" content={`Home page | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content={`${APP_NAME} is a level 5 government healthcare facility located in Vihiga County,along Kisumu-Kakamega road,at Mbale Center ,Opposite County Headquarters.`}
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

    const {data: services} = useSWR(`${API}/featured-general`)
    const {data: blogs, error: blogsError} = useSWR(`${API}/list-recent-blogs`)
    if (blogsError) return <div className='container uh-oh mt-5 pt-5 '><p>uh oh something is
        wrong..Please
        contact Vihiga county referral hospital ICT team for assistance.Thank you </p></div>
    if (!blogs) return <div className='preloader'/>


    return (
        <Fragment>
            {head()}
            <Toolbar home/>
            <Hero/>
            <main id='main'>
                <Clients/>
                <About/>
                {!blogs || blogs.length <= 0 ? null : <LatestBlogs blogs={blogs}/>}
                <Cta/>
                {!services || services.length <= 0 ? null : <FeaturedServices featured={services}/>}
                <CoreValues/>
                {/*<Roles/>*/}
            </main>
            <Footer/>
        </Fragment>

    )
}
