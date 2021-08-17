import React, {Fragment} from 'react';
import Head from "next/head";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import {singleService} from "../../actions/services";
import ServiceDetail from "../../components/services/service-detail";
import Layout from "../../hoc/Layout";


const Slug = ({service, query}) => {
    const head = () => (
        <Head>
            <title>
                {service.title} | {APP_NAME}
            </title>
            <meta name="description" content={service.mdesc}/>
            <link rel="canonical" href={`${DOMAIN}/services/${query.slug}`}/>
            <meta property="og:title" content={`${service.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={service.mdesc}/>
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}/services/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={`${API}/service/photo/${service.slug}`}/>
            <meta property="og:image:secure_url" content={`${API}/service/photo/${service.slug}`}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );



    return (
        <Layout>
            {head()}
            <ServiceDetail
                service={service}/>
        </Layout>
    );
};
export const getServerSideProps = async ({query}) => {

    return singleService(query.slug).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return {
                props: {service: data, query}
            }
        }
    })
}
export default Slug;