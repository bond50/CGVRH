import React, {Fragment, useEffect, useState} from 'react';
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../../config";
import renderHTML from "react-render-html";
import {getAllProjectSlugs, getProject, listProjects} from "../../../actions/projects";
import PageWrapper from "../../../hoc/page-wrapper";
import Layout from "../../../hoc/Layout";
import {getAllSlugs} from "../../../actions/general";

const Slug = ({project, query}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await listProjects();
                setProjects(response);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects(); // Call the fetchProjects function when the component mounts
    }, []);


    const head = () => (
        <Head>
            <title>
                {project.title} | {APP_NAME}
            </title>
            <meta name="description" content={project.metaDesc}/>
            <link rel="canonical" href={`${DOMAIN}/media/projects/${query.slug}`}/>
            <meta property="og:title" content={`${project.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={project.metaDesc}/>
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}/media/projects/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={project.images[0]}/>
            <meta property="og:image:secure_url" content={project.images[0]}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    const showPage = () => {
        return <PageWrapper related={projects} title={`Related to ${project.title}`} projectPage>
            {renderHTML(project.body)}
        </PageWrapper>
    };

    let imgSrc

    if (project.images && project.images.length && project.images.length > 0) {
        const image = project.images[Math.floor(Math.random() * project.images.length)];
        imgSrc = image.url
    }


    return (
        <Fragment>
            {head()}
            <Layout pageTitle={project.title} imageUrl={imgSrc}>
                <main>
                    {showPage()}
                </main>
            </Layout>
        </Fragment>
    )
};
export const getStaticProps = async ({params}) => {
    return getProject(params.slug).then(data => {


        if (data.error) {
            console.log(data.error);
        } else {
            return {
                props: {project: data, query: params},
                revalidate: 60,
            };
        }
    });
};
export const getStaticPaths = async () => {
    const slugs = await getAllProjectSlugs();  // Fetch all possible slugs for pre-rendering
    const paths = slugs.map(slug => ({params: {slug}}));
    return {
        paths,
        fallback: 'blocking',
    };
};
// export const getStaticPaths = async () => {
//     const slugs = await getAllProjectSlugs();  // Fetch all possible slugs for pre-rendering
//     const paths = slugs?.map(slug => ({params: {slug}}));
//    console.log('Paths:', paths);
//     return {
//         paths,
//         fallback: 'blocking',
//     };
// };
export default Slug;