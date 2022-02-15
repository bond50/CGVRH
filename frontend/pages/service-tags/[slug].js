import Layout from "../../hoc/Layout";
import {singleTag} from "../../actions/tag";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import React, {Fragment} from "react";
import SmallCard from "../../components/reusables/card/small-card";
import GeneralPageHeader from "../../hoc/general-page-header";


const Tag = ({tag, services, query}) => {
    const head = () => (
        <Head>
            <title>
                {tag.name} | {APP_NAME}
            </title>
            <meta name="description" content={`${APP_NAME} blog on ${tag.name}`}/>

            <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`}/>
            <meta property="og:title" content={`${tag.name}| ${APP_NAME}`}/>
            <meta property="og:description" content={`${APP_NAME} blog on ${tag.name}`}/>
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image"
                  content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}/>
            <meta property="og:image:secure_url"
                  content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>

        </Head>
    );


    return (
        <Fragment>
            {head()}
            <Layout>
                <GeneralPageHeader
                    imgSrc='/fallback/services.jpg'
                    title={tag.name}
                    title2={`All Articles about ${tag.name} `}
                    alt='fallback image'>
                    <div className="row">
                        {
                            services.map((service) => (
                                <div className="col-md-4" key={service._id}>
                                    <article>
                                        <SmallCard service={service}/>
                                    </article>
                                </div>
                            ))
                        }</div>
                </GeneralPageHeader>
            </Layout>
        </Fragment>
    )
        ;
};
export const getServerSideProps = async ({query}) => {
    return singleTag(query.slug, 'service-tag').then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return {
                props: {
                    tag: data.tag,
                    services: data.services,
                    query
                }
            }
        }
    })
}

export default Tag;