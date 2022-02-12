import React, {Fragment, useEffect, useState} from 'react';
import Head from "next/head";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import Layout from "../../hoc/Layout";
import Card from "../../components/blog/Card";
import GeneralPageWrapper from "../../hoc/general-page-wrapper";
import useSWR from "swr";
import {fetcher} from "../../components/reusables/functions/fetcher";
import Link from "next/link";
import classes from '../../styles/page-bar.module.css'
import {singlePage} from "../../actions/general";
import {listRelated} from "../../actions/general";


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
        return <Card blog={service} single servicePage/>
    };

    return (
        <Fragment>
            {head()}
            <Layout>
                <main>
                    <GeneralPageWrapper
                        title={service.title}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 order-lg-5 order-md-first px-0" style={{background: '#fff'}}>
                                    {showPage()}
                                </div>
                                <div className="col-lg-4 order-lg-1 order-md-last ">
                                    <div className={classes.SideBar}>
                                        <div className={`card ${classes.card}`}>
                                            {!related ? <p>loading</p> :
                                                <Fragment>
                                                    <div className={`card-header ${classes.cardHeader}`}>
                                                        <h4>Related to {service.title}</h4>
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
                    </GeneralPageWrapper>
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