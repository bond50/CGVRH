import React from 'react';
import dynamic from "next/dynamic";
import useSWR from "swr";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../../../config";
import {useRouter} from "next/router";
import Preloader from "../../../../components/preloader";
import {fetcher} from "../../../../axios/axios";
import Head from "next/head";
import AdBanner from "../../../../components/adsense/AdBanner";


const GalleryWrapper = dynamic(() => import("../../../../components/media/gallery/gallery-wrapper"), {
    loading: () => <Preloader/>,
    ssr: false
});
const Layout = dynamic(() => import('../../../../hoc/Layout'), {loading: () => <Preloader/>, ssr: false});

const Slug = () => {
    const router = useRouter();

    const {data, error} = useSWR(
        `${API}/gallery-data/${router.query.slug}`,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    const head = () => (
        <Head>
            <title>Gallery | {APP_NAME}</title>
            <meta name="description"
                  content={`Explore the gallery of ${APP_NAME}. Discover images and media related to our services and events.`}/>
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:title" content={`Gallery | ${APP_NAME}`}/>
            <meta property="og:description"
                  content={`Explore the gallery of ${APP_NAME}. Discover images and media related to our services and events.`}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={`/herp.jpg`}/>
            <meta property="og:image:secure_url" content={`/herp.jpg`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    if (error) return <Layout>
        <div>Failed to load images from cloudinary</div>
    </Layout>;
    if (!data) return <Layout>
        <div className='preloader'/>
    </Layout>;

    return (
        <>
            {head()}
            <Layout>
                <GalleryWrapper data={data.data}/>
                <div className="container py-4">
                    <AdBanner/>
                </div>
            </Layout>
        </>
    );
};

export default Slug;
