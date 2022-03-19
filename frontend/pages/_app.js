import React, {useEffect} from 'react'
import '../styles/globals.css'
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Router from "next/router";
import "animate.css"
import Script from "next/script";
import {FB_APP_ID, GOOGLE_ANALYTICS} from "../config";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();

const MyApp = ({Component, pageProps}) => {

    NProgress.configure({showSpinner: false});
    Router.onRouteChangeStart = () => NProgress.start();
    Router.onRouteChangeComplete = () => NProgress.done();
    Router.onRouteChangeError = () => NProgress.done();

    const returnHead = () => {
        return <Head>
            <meta charSet="UTF-8"/>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta name="description" content="Vihiga County Referral Hospital"/>


            <meta name="description" content="We take care of your precious health "/>
            <meta name="robots" content="max-image-preview:large"/>
            <link rel="canonical" href="https://vihigahospital.go.ke/"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:site_name"
                  content="Vihiga County Referral Hospital (VCRH) is a level 5 government healthcare facility located in Vihiga County,along Kisumu-Kakamega road,at Mbale Center ,Opposite County Headquarters. VCRH has offered services to the people of Vihiga and its environs for the last 21 years. At interception it was referred to as the Vihiga District Hospital and later renamed following devolution of health services in Kenya.In august 2017, the facility was gazetted to be a leval 5 referral hospital."/>
            <meta property="og:type" content="website"/>
            <meta property="og:title"
                  content="Vihiga County Referral Hospital (VCRH) is a level 5 government healthcare facility located in Vihiga County,along Kisumu-Kakamega road,at Mbale Center ,Opposite County Headquarters. VCRH has offered services to the people of Vihiga and its environs for the last 21 years. At interception it was referred to as the Vihiga District Hospital and later renamed following devolution of health services in Kenya.In august 2017, the facility was gazetted to be a leval 5 referral hospital."/>
            <meta property="og:description" content="Excellence in Healthcare,Training and Research"/>
            <meta property="og:url" content="https://vihigahospital.go.ke/"/>
            <meta property="og:image" content="/herp.jpg"/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>

            <title>Vihiga county Referral Hospital</title>

        </Head>
    }

    useEffect(() => {
        AOS.init(
            {duration: 1500, once: true},
        )
    },)


    return <>
        {
            publicRuntimeConfig.PRODUCTION && <>
                <Script
                    strategy="lazyOnload"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS}`}
                />

                <Script strategy="lazyOnload">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
                </Script>
            </>
        }
        {returnHead()}
        <Component {...pageProps} />
    </>


};

export default MyApp
