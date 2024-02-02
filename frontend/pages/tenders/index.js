import GeneralPageHeader from "../../hoc/general-page-header";
import React from "react";
import useSWR from 'swr'
import {fetcher} from "../../components/reusables/functions/fetcher";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import TenderList from "../../components/tenders";
import {useRouter} from "next/router";
import Head from "next/head";

import Layout from "../../hoc/Layout";

const Tender = () => {
    const router = useRouter()
    const head = () => (
        <Head>
            <title>Tenders | {APP_NAME}</title>
            <meta name="description"
                  content={`Explore exclusive public tenders at ${APP_NAME}. Your source for the latest tender opportunities.`}/>

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`Tenders | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content={`Explore exclusive public tenders at ${APP_NAME}. Your source for the latest tender opportunities.`}
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
    const {data: files, error} = useSWR(`${API}/all-tenders`, fetcher)


    if (error) return <div>failed to load Tenders</div>
    if (!files) return <div className='preloader'/>

    if (files.length === 0) {
        return <Layout>
            <GeneralPageHeader
                title={'UH OH !'}
                sub='We regret to inform you that currently, there are no tenders available. Please check back later, as we regularly update our tender listings to provide you with the latest opportunities. Thank you for your understanding and patience'/>

        </Layout>
    }
    return (
        <>
            {head()}
            <Layout>
                <TenderList files={files}/>
            </Layout>
        </>
    );
};

export default Tender;