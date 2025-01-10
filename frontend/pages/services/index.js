import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import {list, listWithPagination} from "../../actions/general";
import {APP_NAME} from "../../config";
import {generateExcerpt} from "../../components/reusables/functions/generate-excerpt";
import {Icon} from "@iconify/react";
import SEOHead from "../../components/SEOHead";
import Layout from "../../hoc/Layout";
import PageWrapper from "../../hoc/page-wrapper";
import PaginationComponent from "../../components/reusables/PaginationComponent"


const Services = ({paginationData, size, page, generalData}) => {

    const firstItemRef = useRef(null);
    const [data, setData] = useState(paginationData.data);

    const perPage = size || 6;
    const [limit, setLimit] = useState(perPage);
    const [current, setCurrent] = useState(page || 1);

    const totalCount = paginationData.totalCount


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await listWithPagination(current, limit);
                setData(data.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [current]);

    useEffect(() => {
        if (firstItemRef.current) {
            firstItemRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [current]);


    const handlePaginationChange = (pg, pgSize) => {
        setCurrent(pg);
        setLimit(pgSize);
    };


    const {
        author,
        description,
        imageUrl,
        keywords,
        locale,
        themeColor,
        title,
        page: seoPageData,


    } = paginationData.seoSettings[0];


    const additionalStructuredData = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Healthcare Service",
            "provider": {
                "@type": "Hospital",
                "name": APP_NAME
            }
        }
    ];

    return (
        <>
            <SEOHead
                title={title}
                description={description}
                url={seoPageData.url}
                imageUrl={imageUrl}
                keywords={keywords}
                locale={locale}
                themeColor={themeColor}
                author={author}
                additionalStructuredData={additionalStructuredData}
            />
            <Layout pages={generalData}>

                <main>
                    <PageWrapper related={generalData} title={`All Services`}>
                        <div className="row gy-4">
                            {data.map((service, index) => (
                                <div
                                    key={index}
                                    className="col-lg-6 col-md-6 services-list"
                                    data-aos="fade-up"
                                    data-aos-delay={100 * index}>
                                    <div className="service-item position-relative">
                                        <div className="icon">
                                            <Icon icon='uil:medical-drip' className='item-icon'/>
                                        </div>
                                        <h3>{service.title}</h3>
                                        <p>{generateExcerpt(service.excerpt, 160)}</p>
                                        <Link href={`/services/${service.slug}`} className='readmore stretched-link'>
                                            <>Continue reading
                                                <Icon icon="eva:arrow-right-fill" className='icon2'/>
                                            </>
                                        </Link>

                                    </div>
                                </div>
                            ))}

                        </div>

                        {/*<div className="container py-4">*/}
                        {/*    <AdBanner/>*/}
                        {/*</div>*/}

                        <div className="d-flex justify-content-center pagination">
                            <PaginationComponent
                                total={totalCount}
                                current={current}
                                pageSize={limit}
                                onChange={handlePaginationChange}
                            />
                        </div>
                    </PageWrapper>
                </main>
            </Layout>
        </>
    )
        ;
};


export const getStaticProps = async () => {
    const page = 1;
    const limit = 6;

    try {
        const generalData = await list();
        const paginationData = await listWithPagination(page, limit);

        if (!generalData || !paginationData || paginationData.data.length === 0) {
            return {
                notFound: true,  // Explicitly trigger a 404 page if data is missing
            };
        }

        return {
            props: {
                paginationData,
                page,
                size: limit,
                generalData,
            },
            revalidate: 60, // Re-generate the page every minute
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            notFound: true, // Catch block now also triggers a 404
        };
    }
};


export default Services;