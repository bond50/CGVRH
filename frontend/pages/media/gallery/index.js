import Gallery from "../../../components/media/gallery/Gallery";
import Layout from "../../../hoc/Layout";
import React from "react";
import axios from "axios"; // Assuming you're using axios for fetching data
import GeneralPageHeader from "../../../hoc/general-page-header";
import { API, APP_NAME, DOMAIN, FB_APP_ID } from "../../../config";
import Head from "next/head";
import {useRouter} from "next/router";

export default function GalleryIndex({ galleryData }) {
    const router = useRouter()

    const head = () => (
        <Head>
            <title>Gallery | {APP_NAME}</title>
            <meta name="description" content={`Get access to our hospital gallery from this section. ${APP_NAME}, We take care of your health`}/>
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:title" content={`Public Documents | ${APP_NAME}`}/>
            <meta property="og:description" content={`Get access to our hospital gallery from this section. ${APP_NAME}, We take care of your health`}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={`/herp.jpg`}/>
            <meta property="og:image:secure_url" content={`/herp.jpg`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    if (!galleryData || galleryData.length === 0) {
        return (
            <Layout pageTitle='Gallery'>
                <GeneralPageHeader title='Sorry nothing to show here'/>
            </Layout>
        );
    }

    return (
        <>
            {head()}
            <Layout>
                <Gallery data={galleryData}/>
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
        console.error('Failed to fetch gallery data:', error);
        return {
            props: {
                galleryData: []
            }
        };
    }
};
