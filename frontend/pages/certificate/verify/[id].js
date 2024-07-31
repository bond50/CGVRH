import React from 'react';
import dynamic from "next/dynamic";
import Head from 'next/head';
import Preloader from "../../../components/preloader";
import { APP_NAME, DOMAIN } from "../../../config";
import AdBanner from "../../../components/adsense/AdBanner";

const CertVerify = dynamic(() => import("../../../components/certificate"), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import("../../../hoc/Layout"), { ssr: false, loading: () => <Preloader /> });

const Id = () => {
    const pageTitle = "Certificate Verification";
    const pageDescription = "Verify certificates issued by our organization.";

    return (
        <>
            <Head>
                <title>{pageTitle} | {APP_NAME}</title>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={`${DOMAIN}/certificate/verify`} />
                <meta property="og:title" content={`${pageTitle} | ${APP_NAME}`} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${DOMAIN}/certificate/verify`} />
                <meta property="og:site_name" content={APP_NAME} />
                <meta property="og:image" content={`${DOMAIN}/static/images/certificate-verification.jpg`} />
                <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/certificate-verification.jpg`} />
                <meta property="og:image:type" content="image/jpeg" />
            </Head>
            <Layout noBread>
                <CertVerify/>
                <div className="container py-4">
                    <AdBanner/>
                </div>
            </Layout>
        </>
    );
};

export default Id;
