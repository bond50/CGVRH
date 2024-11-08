import dynamic from "next/dynamic";
import useSWR from 'swr';
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../../config";
import {getAllProjectSlugs, getProject} from "../../../actions/projects";
import {stripTags} from "../../../components/reusables/utility";
import Preloader from "../../../components/preloader";
import {fetcher} from "../../../axios/axios";
import Head from "next/head";
import React from "react";

const PageWrapper = dynamic(() => import("../../../hoc/page-wrapper"), {ssr: false, loading: () => <Preloader/>});
const Layout = dynamic(() => import("../../../hoc/Layout"), {ssr: false, loading: () => <Preloader/>});

const Slug = ({project, query}) => {
    const {data: projects} = useSWR(`${API}/projects`, fetcher);

    const head = () => (
        <Head>
            <title>
                {project.title} | {APP_NAME}
            </title>
            <meta name="description" content={project.metaDesc}/>
            <link rel="canonical" href={`${DOMAIN}/media/projects/${query.slug}`}/>
            <meta property="og:title" content={`${project.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={project.metaDesc}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/media/projects/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={project.images[0]}/>
            <meta property="og:image:secure_url" content={project.images[0]}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    const showPage = () => {
        return (
            <PageWrapper related={projects} title={`Related`} projectPage>
                {stripTags(project.body, ['strong', 'b'])}
                {/*<div className="container py-4">*/}
                {/*    <AdBanner/>*/}
                {/*</div>*/}
            </PageWrapper>
        );
    };

    let imgSrc;

    if (project.images && project.images.length && project.images.length > 0) {
        const image = project.images[Math.floor(Math.random() * project.images.length)];
        imgSrc = image.url;
    }

    return (
        <>
            {head()}
            <Layout pageTitle={project.title} imageUrl={imgSrc}>
                <main>
                    {showPage()}
                </main>
            </Layout>
        </>
    );
};

export const getStaticProps = async ({params}) => {
    const data = await getProject(params.slug);

    if (!data) {
        return {
            notFound: true,
        };
    }
    if (data.error) {
        console.log(data.error);
    }

    return {
        props: {project: data, query: params},
        revalidate: 60,
    };
};

export const getStaticPaths = async () => {
    const slugs = await getAllProjectSlugs();  // Fetch all possible slugs for pre-rendering
    const paths = slugs.map(slug => ({params: {slug}}));
    return {
        paths,
        fallback: 'blocking',
    };
};

export default Slug;
