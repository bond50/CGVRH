import dynamic from "next/dynamic";
import Head from "next/head";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import React from "react";
import { useRouter } from "next/router";
import Preloader from "../../components/preloader";
import Link from "next/link";


const Layout = dynamic(() => import("../../hoc/Layout"), { ssr: false, loading: () => <Preloader /> });

const Index = () => {
    const router = useRouter();

    const head = () => (
        <Head>
            <title>Media | {APP_NAME}</title>
            <meta
                name="description"
                content={`Welcome to ${APP_NAME} Media section. You can access all images, videos, and downloads from this section.`}
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Media | ${APP_NAME}`} />
            <meta
                property="og:description"
                content={`Welcome to ${APP_NAME} Media section. You can access all images, videos, and downloads from this section.`}
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`/herp.jpg`} />
            <meta property="og:image:secure_url" content={`/herp.jpg`} />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            <meta name="keywords" content="media, downloads, gallery, images, videos, hospital media" />
            <meta name="author" content={APP_NAME} />
        </Head>
    );

    return (
        <>
            {head()}
            <Layout>
                <section>
                    <div className="container page-intro">
                        <h4>Useful Media Links</h4>
                        <ul>
                            <li>
                                <i className="bi bi-chevron-double-right"/>
                                <Link href="/media/downloads">
                                    <a>Downloads</a>
                                </Link>
                            </li>
                            <li>
                                <i className="bi bi-chevron-double-right"/>
                                <Link href="/media/gallery">
                                    <a>The Hospital Gallery</a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/*<div className="container py-4">*/}
                    {/*    <AdBanner/>*/}
                    {/*</div>*/}
                </section>
            </Layout>
        </>
    );
};

export default Index;
