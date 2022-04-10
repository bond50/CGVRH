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
        </Head>
    }

    useEffect(() => {
        AOS.init(
            {duration: 1500, once: true},
        )
    },)


    return <>
        {
            process.env.PRODUCTION && <>
                <Script
                    strategy="lazyOnload"
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
                />

                <Script strategy="lazyOnload">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
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
