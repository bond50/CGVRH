import React, {useEffect} from 'react';
import '../styles/globals.css';
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Router from "next/router";
import {SSRProvider} from '@react-aria/ssr';
import "animate.css";
import "react-datepicker/dist/react-datepicker.css";
import Script from "next/script";
import {ADSENSE_CLIENT_ID, GOOGLE_ANALYTICS_KEY} from "../config";

const MyApp = ({Component, pageProps}) => {
    NProgress.configure({showSpinner: false});
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());

    const returnHead = () => {
        return (
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
        );
    };

    useEffect(() => {
        AOS.init({duration: 1500, once: true});
    }, []);

    return (
        <>
            {GOOGLE_ANALYTICS_KEY && (
                <>
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
            )}

            {ADSENSE_CLIENT_ID && (
                <Script
                    strategy="lazyOnload"
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
                    crossOrigin="anonymous"
                    async
                />
            )}


            {returnHead()}
            <SSRProvider>
                <Component {...pageProps} />
            </SSRProvider>
        </>
    );
};

export default MyApp;
