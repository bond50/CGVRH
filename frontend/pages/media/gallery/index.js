import Gallery from "../../../components/media/gallery/Gallery";
import Layout from "../../../hoc/Layout";
import useSWR from "swr";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../../config";
import {fetcher} from "../../../components/reusables/functions/fetcher";
import React from "react";
import GeneralPageHeader from "../../../hoc/general-page-header";
import {useRouter} from "next/router";
import Head from "next/head";


const GalleryIndex = () => {

    const router = useRouter()
    const head = () => (
        <Head>
            <title>Downloads | {APP_NAME}</title>
            <meta
                name="description"
                content={`Get access to out hospital gallery from this section.${APP_NAME}, We take care of your health`}
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`Public Documents | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content={`Get access to out hospital gallery from this section.${APP_NAME}, We take care of your health`}
            />

            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta
                property="og:image"
                content={`/herp.jpg`}
            />
            <meta
                property="og:image:secure_url"
                content={`/herp.jpg`}
            />
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );
    const {data, error} = useSWR(
        [
            `${API}/get-gallery`,
        ],
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    if (!data) {
        return <div className='preloader'/>
    }
    if (error) {
        return 'Failed to load images from cloudinary '
    }
    if (data.length <= 0) {
        return <Layout>
            <GeneralPageHeader title='Sorry nothing to show here'/>
        </Layout>
    }


    return (
        <>
            {head()}
            <Layout>
                <Gallery
                    data={data}/>
            </Layout>
        </>
    );
};

export default GalleryIndex;