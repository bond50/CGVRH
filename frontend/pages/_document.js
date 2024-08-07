import React from 'react';
import Document, {Head, Html, Main, NextScript} from "next/document";
import {ADSENSE_CLIENT_ID} from "../config";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8"/>
                    {ADSENSE_CLIENT_ID && (
                        <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID}/>
                    )}
                    <meta name="google-adsense-account" content="ca-pub-9278372397525835"/>
                    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
                    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
                    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
                    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
                    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
                    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
                    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="msapplication-TileColor" content="#ffffff"/>
                    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
                    <meta name="theme-color" content="#ffffff"/>
                    <link href="https://fonts.gstatic.com" rel="preconnect"/>
                    <link href="https://fonts.googleapis.com" rel="preconnect"/>
                    <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin='true'/>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/>

                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
