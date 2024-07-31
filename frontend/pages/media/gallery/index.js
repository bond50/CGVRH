import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Head from "next/head";
import {useRouter} from "next/router";
import GeneralPageHeader from "../../../hoc/general-page-header";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../../config";
import Preloader from "../../../components/preloader";
import AdBanner from "../../../components/adsense/AdBanner";

// Dynamically import components
const Gallery = dynamic(() => import("../../../components/media/gallery/Gallery"), {
    ssr: false,
    loading: () => <Preloader/>
});
const Layout = dynamic(() => import("../../../hoc/Layout"), {ssr: false, loading: () => <Preloader/>});

export default function GalleryIndex({galleryData}) {
    const router = useRouter();

    const head = () => (
        <Head>
            <title>Gallery | {APP_NAME}</title>
            <meta name="description"
                  content={`Explore our hospital gallery. ${APP_NAME}, We take care of your health`}/>
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:title" content={`Gallery | ${APP_NAME}`}/>
            <meta property="og:description"
                  content={`Explore our hospital gallery. ${APP_NAME}, We take care of your health`}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={`${DOMAIN}/herp.jpg`}/>
            <meta property="og:image:secure_url" content={`${DOMAIN}/herp.jpg`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    if (!galleryData || galleryData.length === 0) {
        return (
            <Layout pageTitle="Gallery">
                <GeneralPageHeader title="Sorry, nothing to show here"/>
            </Layout>
        );
    }

    return (
        <>
            {head()}
            <Layout>
                <Gallery data={galleryData}/>
                <div className="container">
                    <AdBanner/>
                </div>
            </Layout>
        </>
    );
}

export const getStaticProps = async () => {
    try {
        const response = await axios.get(`${API}/get-gallery`);
        return {
            props: {
                galleryData: response.data
            },
            revalidate: 3600 // Revalidate every hour
        };
    } catch (error) {
        console.error("Failed to fetch gallery data:", error);
        return {
            props: {
                galleryData: []
            }
        };
    }
};
