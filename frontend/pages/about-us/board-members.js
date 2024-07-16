import React from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { API, APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import { useRouter } from "next/router";
import Head from "next/head";
import {fetcher} from "../../axios/axios";
import Preloader from "../../components/preloader";

const Layout = dynamic(() => import('../../hoc/Layout'), { ssr: false, loading: () => <Preloader/> });
const Board = dynamic(() => import('../../components/about/member/Board'), { ssr: false , loading: () => <Preloader/>});

const Index = () => {
    const router = useRouter();

    const head = () => (
        <Head>
            <title>The Hospital Management Team | {APP_NAME}</title>
            <meta name="description" content="Vihiga County Referral Hospital Hospital Management Team" />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`The Hospital Management Team | ${APP_NAME}`} />
            <meta property="og:description" content="Vihiga County Referral Hospital Hospital Management Team" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`/herp.jpg`} />
            <meta property="og:image:secure_url" content={`/herp.jpg`} />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const { data: members, error } = useSWR(`${API}/users-hmt`, fetcher, { revalidateOnFocus: true });

    if (error) return <p>Something went wrong.</p>;
    if (!members) return <div className='preloader' />;

    return (
        <>
            {head()}
            <Layout>
                <Board members={members} />
            </Layout>
        </>
    );
};

export default Index;
