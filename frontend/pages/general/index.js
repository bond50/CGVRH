import React from 'react';
const Layout = dynamic(() => import('../../hoc/Layout'), {loading: () => <Preloader/>,ssr: false})
import Breadcrumbs from "../../components/reusables/Breadcrumbs";
import Link from "next/link";
import {list} from "../../actions/general";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import Preloader from "../../components/preloader";


const Index = ({pages}) => {
    const router = useRouter()

    const head = () => (
        <Head>
            <title>Services| {APP_NAME}</title>
            <meta
                name="description"
                content={`All inpatient and out patient services offered at ${APP_NAME}. We take care of your health`}
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`Medical services | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content={`All inpatient and out patient services offered at ${APP_NAME}. We take care of your health`}
            />

            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta
                property="og:image"
                content={`/herp.jpg`}
            />
            <meta
                property="og:image:secure_url"
                content={`/herp.jpg`}
            />
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    const showList = pages.map(pg => {
        return <li key={pg._id}>
            <i className="bi bi-chevron-double-right"/>
            <Link href={`/general/${pg.slug}`}>
                <a>{pg.title}</a>
            </Link>
        </li>
    })

    return (
        <>
            {head()}
            <Layout>
                <Breadcrumbs/>
                <section>
                    <div className="container page-intro">
                        <h4>Useful Page Links</h4>
                        <ul>
                            {showList}
                        </ul>
                    </div>
                </section>
            </Layout>
        </>
    );
};


export const getServerSideProps = async () => {

    return list().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                props: {
                    pages: data,
                },
            };
        }
    });

};


export default Index;