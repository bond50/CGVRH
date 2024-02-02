import Layout from "../../hoc/Layout";
import React from 'react'
import Board from "../../components/about/member/Board";
import useSWR from "swr";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";

import Head from "next/head";
import {useRouter} from "next/router";


const Index = () => {
    const router = useRouter()
    const head = () => (
        <Head>
            <title>The Hospital Management Team | {APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga County Referral Hospital  Hospital Management Team"
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`The Hospital Management Team | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content="Vihiga County Referral Hospital  Hospital Management Team"
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
    const {data: members, error} = useSWR(
        [
            `${API}/users-hmt`,
        ],
        {
            revalidateOnFocus: true,
        },
    );
    if (!members) {
        return <div className='preloader'/>
    }
    if (error) {
        return <p>something went wrong</p>
    }


    return (
        <>
            {head()}
            <Layout>
                <Board members={members}/>
            </Layout>
        </>

    );
};

export default Index;
