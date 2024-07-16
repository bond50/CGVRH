// pages/downloads/index.js
import React from "react";
import useSWR from 'swr';
import {useRouter} from "next/router";
import Head from "next/head";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../../config";
import {fetcher} from "../../../axios/axios";
import dynamic from "next/dynamic";
import Preloader from "../../../components/preloader";


const DownloadList = dynamic(() => import("../../../components/media/downloads/download-list"), {
    ssr: false,
    loading: () => <Preloader/>
});
const Layout = dynamic(() => import("../../../hoc/Layout"), {ssr: false, loading: () => <Preloader/>});
const GeneralPageHeader = dynamic(() => import("../../../hoc/general-page-header"), {
    ssr: false,
    loading: () => <Preloader/>
});
const Downloads = () => {
    const router = useRouter();

    const {data: files, error} = useSWR(`${API}/get-downloads`, fetcher);

    const head = () => (
        <Head>
            <title>Downloads | {APP_NAME}</title>
            <meta
                name="description"
                content={`Get access to all public documents from this section. ${APP_NAME}, We take care of your health.`}
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:title" content={`Public Documents | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content={`Get access to all public documents from this section. ${APP_NAME}, We take care of your health.`}
            />
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta
                property="og:image"
                content={`${DOMAIN}/herp.jpg`}
            />
            <meta
                property="og:image:secure_url"
                content={`${DOMAIN}/herp.jpg`}
            />
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    if (error) return <div>Failed to load</div>;
    if (!files) return <div className="preloader"/>;

    if (files.length === 0) {
        return (
            <Layout>
                <GeneralPageHeader title="Sorry, nothing to show here"/>
            </Layout>
        );
    }

    return (
        <>
            {head()}
            <Layout pageTitle="Downloads">
                <DownloadList files={files}/>
            </Layout>
        </>
    );
};

export default Downloads;
