import React, {Fragment, useEffect, useState} from 'react';
import Head from "next/head";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import Layout from "../../hoc/Layout";
import Link from "next/link";
import {listRelated, singlePage} from "../../actions/general";
import PageWrapper from "../../hoc/page-wrapper";
import {useRouter} from "next/router";


const Slug = ({service, query}) => {
    const router = useRouter()

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
        loadRelated()
    }, [service])


    function showAllServices() {
        return related.map(service => {
            return <li key={service._id}>
                <Link href={`/general/${service.slug}`}>
                    <a className="list-group-item list-group-item-action">{service.title}</a>
                </Link>
            </li>
        })

    }


    const head = () => (
        <Head>
            <title>
                {service.title} | {APP_NAME}
            </title>
            <meta name="description" content={service.mdesc}/>
            <link rel="canonical" href={`${DOMAIN}/general/${query.slug}`}/>
            <meta property="og:title" content={`${service.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={service.mdesc}/>
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
        return <PageWrapper page={service} related={related}/>

    };

    return (
        <Fragment>
            {head()}
            <Layout>
                <main>
                    {showPage()}
                </main>
            </Layout>
        </Fragment>
    )
};
export const getServerSideProps = async ({query}) => {

    return singlePage(query.slug).then(data => {
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