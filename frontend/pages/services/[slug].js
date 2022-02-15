import React, {Fragment} from 'react';
import Head from "next/head";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import {singleService} from "../../actions/services";
import Layout from "../../hoc/Layout";
import Card from "../../components/blog/Card";
import GeneralPageHeader from "../../hoc/general-page-header";
import useSWR from "swr";
import {fetcher} from "../../components/reusables/functions/fetcher";

import Link from "next/link";

import classes from '../../styles/page-bar.module.css'


const Slug = ({service, query}) => {


    const {data: services, error: serviceError} = useSWR(
        [
            `${API}/list-service-names-slugs`,
        ],
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );


    function showAllServices() {
        return services.map(service => {
            return <li key={service._id}>
                <Link href={`/services/${service.slug}`}>
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

    const showPage = () => {
        return <Card blog={service} single servicePage/>
    };

    return (
        <Fragment>
            {head()}
            <Layout>
                <main>
                    <GeneralPageHeader
                        title={service.title}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 order-lg-5 order-md-first px-0" style={{background: '#fff'}}>
                                    {showPage()}
                                </div>
                                <div className="col-lg-4 order-lg-1 order-md-last ">
                                    <div className={classes.SideBar}>
                                        <div className={`card ${classes.card}`}>
                                            {!services ? <p>loading</p> :
                                                <Fragment>
                                                    <div className={`card-header ${classes.cardHeader}`}>
                                                        <h4>All services and Patient Care</h4>
                                                    </div>
                                                    <ul className="list-group list-group-flush ">
                                                        {showAllServices()}
                                                    </ul>
                                                </Fragment>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </GeneralPageHeader>
                </main>
            </Layout>
        </Fragment>
    )
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