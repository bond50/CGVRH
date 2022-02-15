import '../styles/globals.css'
import AOS from "aos";
import "aos/dist/aos.css";
import {useEffect} from "react";
import Head from "next/head";
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Router from "next/router";
import "animate.css"


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
            {/*Favicons*/}
            {/*<link rel="icon" href={`logo.png`}/>*/}

            {/*<link*/}
            {/*    href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i|Muli:300,300i,400,400i,500,500i,600,600i,700,700i"*/}
            {/*    rel="stylesheet"/> */}
            <link href="https://fonts.gstatic.com" rel="preconnect"/>
            <link
                href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i|Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
                rel="stylesheet"/>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                  crossOrigin="anonymous"/>


            <link href="/theme/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"/>

            <link href="/theme/fontawesome/css/all.min.css" rel="stylesheet"/>
            {/*<link href="/theme/swiper/swiper-bundle.min.css" rel="stylesheet"/>*/}
            <title>Vihiga county Referral Hospital</title>

        </Head>
    }

    useEffect(() => {
        AOS.init(
            {duration: 1500, once: true},
        )
    },)


    return <>
        {returnHead()}
        <Component {...pageProps} />
    </>


};

export default MyApp
