import Head from "next/head";
import React, {Fragment} from "react";
import Layout from "../../hoc/Layout";
import {list} from "../../actions/services";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import {useRouter} from "next/router";
import ServiceList from "../../components/services/service-list";

const Services = ({services}) => {
    const router = useRouter()
    const head = () => (
        <Head>
            <title>All Services | {APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga county referral hospital medical services and patient care "
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:title" content={`Services offered  | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content="Vihiga county referral hospital services"
            />

            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta
                property="og:image"
                content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}
            />
            <meta
                property="og:image:secure_url"
                content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}
            />
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );


    return (
        <Fragment>
            {head()}
            <Layout>
                <ServiceList services={services}/>
            </Layout>
        </Fragment>
    );
};

export const getStaticProps = async (context) => {
    return list().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                props: {
                    services: data,
                },
            };
        }
    });
};

export default Services
