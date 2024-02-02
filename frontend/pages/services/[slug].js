import React, {Fragment, useEffect, useState} from 'react';
import Head from "next/head";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";

import {getAllSlugs, listRelated, singlePage} from "../../actions/general";
import PageWrapper from "../../hoc/page-wrapper";
import Layout from "../../hoc/Layout";

const Slug = ({service, query}) => {
    const [related, setRelated] = useState([])

    const loadRelated = () => {
        listRelated({service}).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setRelated(data)
            }
        })
    };

    useEffect(() => {
        loadRelated();
    }, [service.slug]);


    const head = () => (
        <Head>
            <title>
                {service.title} | {APP_NAME}
            </title>
            <meta name="description" content={service.metaDesc}/>

            <link rel="canonical" href={`${DOMAIN}/general/${query.slug}`}/>
            <meta property="og:title" content={`${service.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={service.metaDesc}/>
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}/general/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={`${API}/page/photo/${service.slug}`}/>
            <meta property="og:image:secure_url" content={`${API}/page/photo/${service.slug}`}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    const showPage = () => {
        return <PageWrapper
            page={service}
            related={related}/>

    };

    let imgSrc

    if (service.images && service.images.length && service.images.length > 0) {
        const image = service.images[Math.floor(Math.random() * service.images.length)];
        imgSrc = image.url
    } else {
        imgSrc = `${API}/general/photo/${service.slug}`
    }


    return (
        <Fragment>
            {head()}
            <Layout pageTitle={service.title} imageUrl={imgSrc}>
                <main>
                    {showPage()}
                </main>
            </Layout>
        </Fragment>
    )
};
export const getStaticProps = async ({params}) => {
    return singlePage(params.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                props: {service: data, query: params},
                revalidate: 60,  // Optional: re-generate the page at most once per minute
            };
        }
    });
};

export const getStaticPaths = async () => {
    const slugs = await getAllSlugs();  // Fetch all possible slugs for pre-rendering
    const paths = slugs.map(slug => ({params: {slug}}));
    return {
        paths,
        fallback: 'blocking',
    };
};
export default Slug;