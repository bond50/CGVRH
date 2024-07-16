import Head from 'next/head';
import {APP_NAME, FB_APP_ID, SITE_URL, TWITTER_HANDLE} from "../config";
import React from "react";

const SEOHead = ({
    title,
    description,
    url,
    imageUrl,
    keywords,
    author,
    twitterHandle = TWITTER_HANDLE,
    type = "website",
    siteName = APP_NAME,
    fbAppId = FB_APP_ID,
    structuredData = {},
    locale = "en_US",
    themeColor = "#ffffff",
    additionalStructuredData = []
}) => {
    const schemaData = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": SITE_URL,
            "name": SITE_URL,
            "potentialAction": {
                "@type": "SearchAction",
                "target": `${SITE_URL}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
            },
            ...structuredData
        },
        {
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": APP_NAME,
            "url": SITE_URL,
            "logo": `https://res.cloudinary.com/dwtcilinl/image/upload/v1713525251/vc150_ti3ywx.png`,
            "sameAs": [
                "https://www.facebook.com/profile.php?id=100063774356598"
            ]
        },
        ...additionalStructuredData
    ];

    return (
        <Head>
            <meta charSet="UTF-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            <meta name="author" content={author}/>
            <meta name="robots" content="index, follow"/>
            <meta name="theme-color" content={themeColor}/>
            <meta name="google-site-verification" content="Kcrylmv8RWsNALOsmjyga_p6uCldee4CwnA0aMCMym4"/>


            <title>{title}</title>
            <link rel="canonical" href={url}/>

            {/* Open Graph */}
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content={type}/>
            <meta property="og:url" content={url}/>
            <meta property="og:site_name" content={siteName}/>
            <meta property="og:image" content={imageUrl}/>
            <meta property="og:image:secure_url" content={imageUrl}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="og:locale" content={locale}/>
            <meta property="article:author" content={author}/>

            {/* Facebook */}
            <meta property="fb:app_id" content={fbAppId}/>

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content={twitterHandle}/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={imageUrl}/>

            {/* Structured Data */}
            {schemaData.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Head>
    );
};

export default SEOHead;
