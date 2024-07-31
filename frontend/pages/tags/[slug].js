import dynamic from "next/dynamic";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import React from "react";
import {getAllTagSlugs, singleTag} from "../../actions/tag";
import Preloader from "../../components/preloader";
import AdBanner from "../../components/adsense/AdBanner";

const SmallCard = dynamic(() => import("../../components/reusables/card/small-card"), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import("../../hoc/Layout"), { ssr: false, loading: () => <Preloader /> });

const Tag = ({ tag, blogs, query }) => {
    const head = () => (
        <Head>
            <title>{tag.name} | {APP_NAME}</title>
            <meta name="description" content={`${APP_NAME} blog on ${tag.title}`} />
            <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
            <meta property="og:title" content={`${tag.title}| ${APP_NAME}`} />
            <meta property="og:description" content={`${APP_NAME} blog on ${tag.title}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`} />
            <meta property="og:site_name" content={APP_NAME} />
            <meta property="og:image" content="https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png" />
            <meta property="og:image:secure_url" content="https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png" />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={FB_APP_ID} />
        </Head>
    );

    return (
        <>
            {head()}
            <Layout blog noBread>
                <section className='blog-section'>
                    <div className="container mt-2">
                        <div className="row">
                            {blogs.map(blog => (
                                <div className="col-md-4" key={blog._id}>
                                    <article>
                                        <SmallCard blog={blog}/>
                                    </article>
                                </div>
                            ))}
                        </div>
                        <div className="container py-4">
                            <AdBanner/>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export const getStaticProps = async ({ params }) => {
    const data = await singleTag(params.slug, 'tag');
    if (data.error) {
        console.log(data.error);
        return { notFound: true };
    } else {
        return {
            props: {
                tag: data.tag,
                blogs: data.blogs,
                query: params,
            },
            revalidate: 60, // ISR, re-generate the page every 60 seconds
        };
    }
};

export const getStaticPaths = async () => {
    const paths = await getAllTagSlugs();
    return {
        paths,
        fallback: 'blocking',
    };
};

export default Tag;
