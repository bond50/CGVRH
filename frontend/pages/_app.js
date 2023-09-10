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
import {GOOGLE_ANALYTICS_KEY} from "../config";


const MyApp = ({Component, pageProps}) => {

    // NProgress.configure({showSpinner: true});
    // Router.onRouteChangeStart = () => NProgress.start();
    // Router.onRouteChangeComplete = () => NProgress.done();
    // Router.onRouteChangeError = () => NProgress.done();


    const returnHead = () => {
        return <Head>
            <meta charSet="UTF-8"/>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
        </Head>
    }

    useEffect(() => {
        AOS.init(
            {duration: 1500, once: true},
        )
    },)


    return <>
        {
            GOOGLE_ANALYTICS_KEY && <>
                <Script
                    strategy="beforeInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_KEY}`}
                    async
                />

                <Script strategy="beforeInteractive">
                    {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GOOGLE_ANALYTICS_KEY}');
      `}
                </Script>
            </>
        }


        {returnHead()}
        <Component {...pageProps} />
    </>


};

export default MyApp
