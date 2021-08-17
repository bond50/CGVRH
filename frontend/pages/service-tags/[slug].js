import Layout from "../../hoc/Layout";
import {singleTag} from "../../actions/tag";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import React from "react";
import SmallCard from "../../components/reusables/card/small-card";



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
    const showTags = () => {
        return services.map((service, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard service={service}/>
                </article>
            </div>
        ));
    };


    return (
        <>
        {head()}
        <Layout>

            <div className="container">
                <h4 className="text-center pt-4 pb-4 h1">Articles on {tag.name}</h4>
                <div className="row">{showTags}</div>
            </div>

            {/*<main>*/}
            {/*    <div className="container">*/}
            {/*        <header className={classes.Header}>*/}
            {/*            <div className="col-md-12 pt-3">*/}
            {/*                <h1 className="display-4 font-weight-bold">{tag.name}</h1>*/}
            {/*                {blogs.map((b, i) => {*/}
            {/*                        return <div>*/}
            {/*                            <Card key={i} blog={b}/>*/}
            {/*                            <hr/>*/}
            {/*                        </div>*/}
            {/*                    }*/}
            {/*                )}*/}
            {/*            </div>*/}
            {/*        </header>*/}
            {/*    </div>*/}
        {/*</main>*/}

        </Layout>
</>
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