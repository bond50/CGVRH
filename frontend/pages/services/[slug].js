import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {API, APP_NAME} from "../../config";
import {stripTags} from "../../components/reusables/utility";
import {getAllSlugs, listRelated, singlePage} from "../../actions/general";
import dynamic from "next/dynamic";
import Preloader from "../../components/preloader";
import SEOHead from "../../components/SEOHead";
// import AdBanner from "../../components/adsense/AdBanner";

const PageWrapper = dynamic(() => import("../../hoc/page-wrapper"), {ssr: false, loading: () => <Preloader/>});
const Layout = dynamic(() => import("../../hoc/Layout"), {ssr: false, loading: () => <Preloader/>});

const Slug = ({service}) => {
    const [related, setRelated] = useState([])

    const loadRelated = useCallback(() => {
        let isMounted = true;
        listRelated({service}).then(data => {
            if (!isMounted) return;
            if (!data) {
                return {notFound: true}
            }
            if (data.error) {
                console.log(data.error)
            } else {
                setRelated(data)
            }
        });
        return () => {
            isMounted = false;
        };
    }, [service]);

    useEffect(() => {
        return loadRelated();
    }, [loadRelated]);

    const showPage = () => {
        return service ? (
            <PageWrapper related={related} title={`Related`}>
                {stripTags(service.body, ['strong', 'b'])}
                {/*<div className="container py-4">*/}
                {/*    <AdBanner/>*/}
                {/*</div>*/}
            </PageWrapper>
        ) : (
            <div>Loading...</div>
        );
    };

    let imgSrc;
    if (service.images && service.images.length > 0) {
        imgSrc = service.images[0].url;
    } else {
        imgSrc = `${API}/general/photo/${service.slug}`;
    }

    const additionalStructuredData = [
        {
            "@context": "https://schema.org",
            "@type": "MedicalService",
            "name": service.metaTitle,
            "description": service.metaDesc,
            "provider": {
                "@type": "Hospital",
                "name": APP_NAME
            },
            "url": `https://vihigahospital.go.ke/services/${service.slug}`
        }
    ];

    return (
        <Fragment>
            <SEOHead
                title={`${service.metaTitle}`}
                description={service.metaDesc}
                url={`https://vihigahospital.go.ke/services/${service.slug}`}
                imageUrl={service.imageUrl}
                keywords={`${service.title}, Vihiga County Referral Hospital, cardiology`}
                author={`${APP_NAME}`}
                additionalStructuredData={additionalStructuredData}
            />
            <Layout pageTitle={service.title} imageUrl={imgSrc}>
                <main>
                    {showPage()}
                </main>
            </Layout>
        </Fragment>
    )
};

export const getStaticProps = async ({params}) => {
    const data = await singlePage(params.slug);

    if (!data) {
        return {
            notFound: true,
        };
    }
    if (data.error) {
        console.log(data.error)
    }

    return {
        props: {service: data, query: params},
        revalidate: 60,  // Optional: re-generate the page at most once per minute
    };
};

export const getStaticPaths = async () => {
    const slugs = await getAllSlugs();  // Fetch all possible slugs for pre-rendering
    const paths = slugs.map(slug => ({params: {slug}}));
    return {
        paths,
        fallback: 'blocking',
    };
};

export default Slug;
