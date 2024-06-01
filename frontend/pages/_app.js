// import React, {useEffect} from 'react'
// import '../styles/globals.css'
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Head from "next/head";
// import 'nprogress/nprogress.css';
// import NProgress from 'nprogress';
// import Router from "next/router";
// import "animate.css"
// import "react-datepicker/dist/react-datepicker.css";
// import Script from "next/script";
// import {GOOGLE_ANALYTICS_KEY} from "../config";
//
//
// const MyApp = ({Component, pageProps}) => {
//
//     NProgress.configure({showSpinner: false});
//     Router.onRouteChangeStart = () => NProgress.start();
//     Router.onRouteChangeComplete = () => NProgress.done();
//     Router.onRouteChangeError = () => NProgress.done();
//
//
//     const returnHead = () => {
//         return <Head>
//             <meta charSet="UTF-8"/>
//             <meta
//                 name="viewport"
//                 content="width=device-width, initial-scale=1.0"
//             />
//         </Head>
//     }
//
//     useEffect(() => {
//         AOS.init(
//             {duration: 1500, once: true},
//         )
//     },)
//
//
//     return <>
//         <script async
//                 src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9278372397525835"
//                 crossOrigin="anonymous">
//
//         </script>
//         {
//             GOOGLE_ANALYTICS_KEY && <>
//                 <Script
//                     strategy="beforeInteractive"
//                     src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_KEY}`}
//                     async
//                 />
//
//                 <Script strategy="beforeInteractive">
//                     {`
//         window.dataLayer = window.dataLayer || [];
//         function gtag(){dataLayer.push(arguments);}
//         gtag('js', new Date());
//         gtag('config', '${GOOGLE_ANALYTICS_KEY}');
//       `}
//                 </Script>
//             </>
//         }
//
//
//         {returnHead()}
//         <Component {...pageProps} />
//     </>
//
//
// };
//
// export default MyApp


import React, {useEffect} from 'react';
import '../styles/globals.css';
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Router from "next/router";
import "animate.css";
import "react-datepicker/dist/react-datepicker.css";
import Script from "next/script";
import { GOOGLE_ANALYTICS_KEY } from "../config";

const MyApp = ({ Component, pageProps }) => {
    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());

    const returnHead = () => {
        return (
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
        );
    };

    useEffect(() => {
        AOS.init({ duration: 1500, once: true });
    }, []);

    const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

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
                    strategy="afterInteractive"
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
                    crossOrigin="anonymous"
                    async
                />
            )}

            {returnHead()}
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
