import React from "react";
import axios from "axios";
import {API} from "../config";
import dynamic from "next/dynamic";
import Preloader from "../components/preloader";
import SEOHead from "../components/SEOHead";
import AdBanner from "../components/adsense/AdBanner";

const Layout = dynamic(() => import("../hoc/Layout"), {ssr: false, loading: () => <Preloader/>});

const HospitalOverview = dynamic(() => import("../components/home/hospital-overview"), {
    ssr: false,
    loading: () => <Preloader/>
});
const HomeCounter = dynamic(() => import("../components/home/home-counter"), {ssr: false, loading: () => <Preloader/>});
const About = dynamic(() => import("../components/home/about"), {ssr: false, loading: () => <Preloader/>});
const Cta = dynamic(() => import("../components/home/cta"), {ssr: false, loading: () => <Preloader/>});
const LatestBlogs = dynamic(() => import("../components/home/recent/LatestBlogs"), {
    ssr: false,
    loading: () => <Preloader/>
});
const FeaturedServices = dynamic(() => import("../components/home/FeaturedServices"), {
    ssr: false,
    loading: () => <Preloader/>
});

export default function Home({services, blogs, featuredAll: allFeatured, seoSettings}) {
    const {
        author,
        description,
        imageUrl,
        keywords,
        locale,
        themeColor,
        title,
        page,


    } = seoSettings[0];


    return (
        <>
            <SEOHead
                title={title}
                author={author}
                description={description}
                url={page.url}
                imageUrl={imageUrl}
                themeColor={themeColor}
                locale={locale}
                keywords={keywords}
            />
            <Layout noBread home featuredServices={services} allFeatured={allFeatured} featuredBlogs={blogs}>
                <HospitalOverview/>
                <HomeCounter/>
                <About/>
                <FeaturedServices services={services}/>
                <Cta/>
                <LatestBlogs/>
                <div className="container">
                    <AdBanner/>
                </div>
            </Layout>
        </>
    );
}

export const getStaticProps = async () => {
    const fetchServices = axios.get(`${API}/featured-general`);
    const fetchBlogs = axios.get(`${API}/featured-blogs`);
    const allFeatured = axios.get(`${API}/featured-all`);
    const getSEOSettings = axios.get(`${API}/home-page-seo`)


    const [servicesResponse, blogsResponse, allResponse, seoResponse] = await Promise.all([fetchServices, fetchBlogs, allFeatured, getSEOSettings]);

    return {
        props: {
            services: servicesResponse.data,
            blogs: blogsResponse.data,
            featuredAll: allResponse.data,
            seoSettings: seoResponse.data
        },
        revalidate: 60,
    };
};
