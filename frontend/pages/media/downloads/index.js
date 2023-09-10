import GeneralPageHeader from "../../../hoc/general-page-header";
import React from "react";
import Breadcrumbs from "../../../components/reusables/Breadcrumbs";
import useSWR from 'swr'
import {fetcher} from "../../../components/reusables/functions/fetcher";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../../config";
import DownloadList from "../../../components/media/downloads/download-list";
import {useRouter} from "next/router";
import Head from "next/head";


import Layout from "../../../hoc/Layout";

const Downloads = () => {
    const router = useRouter()
    const head = () => (
        <Head>
            <title>Downloads | {APP_NAME}</title>
            <meta
                name="description"
                content={`Get access to all public documents  from this section.${APP_NAME}, We take care of your health`}
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`Public Documents | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content={`Get access to all public documents  from this section.${APP_NAME}, We take care of your health`}
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
    const {data: files, error} = useSWR(`${API}/get-downloads`, fetcher)


    if (error) return <div>failed to load</div>
    if (!files) return <div className='preloader'/>

    if (files.length === 0) {
        return <Layout>
            <GeneralPageHeader title='Sorry nothing to show here'/>
        </Layout>
    }
    return (
        <>
            {head()}
            <Layout>
                <Breadcrumbs/>
                <DownloadList files={files}/>
            </Layout>
        </>
    );
};

export default Downloads;