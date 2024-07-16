import React from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import { APP_NAME, DOMAIN, FB_APP_ID } from "../../../config";
import { useRouter } from "next/router";
import { listProjects } from "../../../actions/projects";
import { generateExcerpt } from "../../../components/reusables/functions/generate-excerpt";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Preloader from "../../../components/preloader";

const Layout = dynamic(() => import("../../../hoc/Layout"), { ssr: false, loading: () => <Preloader /> });
const PageWrapper = dynamic(() => import("../../../hoc/page-wrapper"), { ssr: false, loading: () => <Preloader /> });

const Projects = ({ projects }) => {
    const router = useRouter();
    const head = () => (
        <Head>
            <title>Projects | {APP_NAME}</title>
            <meta
                name="description"
                content="Explore projects and medical services offered at Vihiga County Referral Hospital. We provide comprehensive healthcare solutions for our community."
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content="Projects | Vihiga County Referral Hospital" />
            <meta
                property="og:description"
                content="Explore projects and medical services offered at Vihiga County Referral Hospital. We provide comprehensive healthcare solutions for our community."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content="Vihiga County Referral Hospital" />
            <meta property="og:image" content="/herp.jpg" />
            <meta property="og:image:secure_url" content="/herp.jpg" />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            <meta
                name="keywords"
                content="Vihiga County Referral Hospital,VCRH,Doctors Plaza, Funeral Home, projects, healthcare, medical services"
            />
        </Head>
    );

    return (
        <>
            {head()}
            <Layout pageTitle="Projects">
                <main>
                    <PageWrapper related={projects} title="All Projects" projectPage>
                        <div className="row gy-4">
                            {projects && projects.map((service, index) => (
                                <div
                                    key={index}
                                    className="col-lg-6 col-md-6 services-list"
                                    data-aos="fade-up"
                                    data-aos-delay={100 * index}
                                >
                                    <div className="service-item position-relative">
                                        <div className="icon">
                                            <Icon icon="uil:medical-drip" className="item-icon" />
                                        </div>
                                        <h3>{service.title}</h3>
                                        <p>{generateExcerpt(service.excerpt, 160)}</p>
                                        <Link href={`/media/projects/${service.slug}`}>
                                            <a className="readmore stretched-link">
                                                Continue reading
                                                <Icon icon="eva:arrow-right-fill" className="icon2" />
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </PageWrapper>
                </main>
            </Layout>
        </>
    );
};

export const getStaticProps = async () => {
    try {
        const projects = await listProjects();
        return {
            props: { projects },
            revalidate: 60,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: { error: 'Failed to fetch data' },
            revalidate: 60,
        };
    }
};

export default Projects;
