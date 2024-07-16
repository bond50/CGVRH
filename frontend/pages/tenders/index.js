import React from "react";
import useSWR from 'swr';
import {API, SITE_URL} from "../../config";
import {fetcher} from "../../axios/axios";
import Preloader from "../../components/preloader";
import dynamic from "next/dynamic";
import SEOHead from "../../components/SEOHead";

const TenderList = dynamic(() => import("../../components/tenders"), {ssr: false, loading: () => <Preloader/>});
const Layout = dynamic(() => import("../../hoc/Layout"), {ssr: false, loading: () => <Preloader/>});
const GeneralPageHeader = dynamic(() => import("../../hoc/general-page-header"), {
    ssr: false,
    loading: () => <Preloader/>
});


const Tender = () => {

    const {data, error} = useSWR(`${API}/all-tenders`, fetcher);
    if (error) return <Layout><GeneralPageHeader title="Error" sub="Failed to load tenders."/></Layout>;
    if (!data) return <Layout><Preloader/></Layout>;
    const  files = data.tenders
    const seoSettings = data.seoSettings


    if (files.length === 0) {
        return (
            <Layout>
                <GeneralPageHeader
                    title="UH OH !"
                    sub="We regret to inform you that currently, there are no tenders available. Please check back later, as we regularly update our tender listings to provide you with the latest opportunities. Thank you for your understanding and patience"
                />
            </Layout>
        );
    }


    const pageUrl = `${SITE_URL}/tenders`;

    const {
        author,
        description,
        imageUrl,
        keywords,
        locale,
        themeColor,
        title,



    } = seoSettings[0];


    const additionalStructuredData = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "publisher": {
                "@type": "Organization",
                "name": "Vihiga County Referral Hospital",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://res.cloudinary.com/dwtcilinl/image/upload/v1713525251/vc150_ti3ywx.png"
                }
            }
        }
    ];


    return (
        <>
            <SEOHead
                title={title}
                description={description}
                url={pageUrl}
                imageUrl={imageUrl}
                keywords={keywords}
                author={author}
                additionalStructuredData={additionalStructuredData}
                locale={locale}
                themeColor={themeColor}
            />
            <Layout>
                <TenderList files={files}/>
            </Layout>
        </>
    );
};

export default Tender;
