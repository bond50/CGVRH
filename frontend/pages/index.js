import React from "react";
import axios from "axios";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../config";
import {YearsOperated} from "../components/years-operated/YearsOperated";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import Layout from "../hoc/Layout";
import WhyUs from "../components/home/why-us";
import HomeCounter from "../components/home/home-counter";

const About = dynamic(() => import("../components/home/about"), {ssr: false});
const Clients = dynamic(() => import("../components/home/clients"), {ssr: false});
const Cta = dynamic(() => import("../components/home/cta"), {ssr: false});
const Head = dynamic(() => import("next/head"), {ssr: false});
const LatestBlogs = dynamic(() => import("../components/home/recent/LatestBlogs"), {ssr: false});
const FeaturedServices = dynamic(() => import("../components/home/FeaturedServices"), {ssr: false});
//const Gallery = dynamic(() => import("../components/home/home-gallery/HomeGallery"), {ssr: false});

export default function Home({services, blogs, featuredAll: allFeatured}) {
    const router = useRouter();

    const head = () => (
        <Head>
            <title>{APP_NAME} </title>
            <meta name="google-site-verification" content="Kcrylmv8RWsNALOsmjyga_p6uCldee4CwnA0aMCMym4"/>
            <meta
                name="description"
                content={`${APP_NAME} is a level 4 government healthcare facility located in Western part of Kenya.We've been offering services for the last ${YearsOperated()} years`}
            />
            <meta name="keywords"
                  content="Vihiga,
                       Vihiga hospital,
                       county government of vihiga,
                       hospital in Vihiga,
                       level 4 hospital in Kenya,
                       level 4 hospital in Mbale,
                       hospital in Mbale Kenya,
                       hospital in Western Kenya,
                       Vihiga County,
                       healthcare in Vihiga,
                       Vihiga medical services,
                       best hospital in Vihiga,
                       medical care in Vihiga,
                       Vihiga health center,
                       hospitals in Western Kenya,
                       medical services in Mbale,
                       Mbale health services,
                       healthcare in Western Kenya,
                       Vihiga County healthcare,
                       Vihiga County hospital,
                       Vihiga County health services"/>

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta name="robots" content="max-image-preview:large"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:title" content={`${APP_NAME}`}/>
            <meta
                property="og:description"
                content={`${APP_NAME} is a level 4 government healthcare facility located in Western part of Kenya.We've been offering services for the last ${YearsOperated()} years`}
            />
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={`/herp.jpg`}/>
            <meta property="og:image:secure_url" content={`/herp.jpg`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Hospital",
                    "name": APP_NAME,
                    "url": DOMAIN,
                    "logo": `https://asset.cloudinary.com/dwtcilinl/b640e6d08f8574e718edca77a4bd1164`,
                    "sameAs": [
                        "https://www.facebook.com/profile.php?id=100063774356598"
                    ],
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+254-723-103-564",
                        "contactType": "Nurse covering"
                    },
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "1069",
                        "addressLocality": "Maragoli",
                        "addressRegion": "Western",
                        "postalCode": "50300",
                        "addressCountry": "KE"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "0.07926612499999998",
                        "longitude": "34.72226381249999"
                    },
                    "medicalSpecialty": "General"
                })
            }}/>


        </Head>
    );

    return (
        <>
            {head()}
            <Layout
                noBread
                home
                featuredServices={services}
                allFeatured={allFeatured}
                featuredBlogs={blogs}>
                <Clients/>
                <WhyUs/>
                <About/>


                <HomeCounter/>
                {/*<Gallery/>*/}
                <FeaturedServices services={services}/>
                <Cta/>
                <LatestBlogs/>
            </Layout>
        </>
    );
}

export const getStaticProps = async () => {
    const fetchServices = axios.get(`${API}/featured-general`);
    const fetchBlogs = axios.get(`${API}/featured-blogs`);
    const allFeatured = axios.get(`${API}/featured-all`);

    const [servicesResponse, blogsResponse, allResponse] = await Promise.all([fetchServices, fetchBlogs, allFeatured]);

    return {
        props: {
            services: servicesResponse.data,
            blogs: blogsResponse.data,
            featuredAll: allResponse.data,
        },
        revalidate: 60,
    };
};