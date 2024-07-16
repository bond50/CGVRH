import {APP_NAME, SITE_URL} from "../../config";

import dynamic from "next/dynamic";
import React from 'react';
import Preloader from "../../components/preloader";

import SEOHead from "../../components/SEOHead";
import axiosInstance from "../../axios/axios";

const About = dynamic(() => import("../../components/about"), {ssr: false, loading: () => <Preloader/>});
const CoreValues = dynamic(() => import("../../components/about/CoreValues"), {
    ssr: false,
    loading: () => <Preloader/>
});
const AboutCounter = dynamic(() => import("../../components/about/AboutCounter"), {
    ssr: false,
    loading: () => <Preloader/>
});
const Layout = dynamic(() => import("../../hoc/Layout"), {ssr: false, loading: () => <Preloader/>});
const Partners = dynamic(() => import("../../components/about/Partners"), {ssr: false, loading: () => <Preloader/>});

const Index = ({seoSettings}) => {
    const {
        author,
        description,
        imageUrl,
        keywords,
        locale,
        themeColor,
        title,
    } = seoSettings[0];

    const additionalStructuredData = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": APP_NAME,
            "url": SITE_URL,
            "logo": {
                "@type": "ImageObject",
                "url": "https://res.cloudinary.com/dwtcilinl/image/upload/v1713525251/vc150_ti3ywx.png"
            },
            "description": description,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "P.O. Box 1069-50300, Maragoli",
                "addressLocality": "Vihiga",
                "addressRegion": "Vihiga County",
                "postalCode": "50300",
                "addressCountry": "KE"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254-723-103-564",
                "contactType": "Nurse Covering"
            },
            "sameAs": [
                "https://www.facebook.com/profile.php?id=100063774356598"
            ]
        }
    ];

    return (
        <>
            <SEOHead
                title={title}
                description={description}
                url={`${SITE_URL}/about-us`}
                imageUrl={imageUrl}
                keywords={keywords}
                author={author}
                locale={locale}
                themeColor={themeColor}
                additionalStructuredData={additionalStructuredData}
            />
            <Layout>
                <About/>
                <CoreValues/>
                <AboutCounter/>
                <Partners/>
            </Layout>
        </>
    );
};

export async function getStaticProps() {
    // Replace this with your data fetching logic
    const res = await axiosInstance.get(`/about-page-seo`);
    const seoSettings = await res.data;
    return {
        props: {
            seoSettings,
        },
    };
}

export default Index;
