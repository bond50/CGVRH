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



const Index = ({paginationData, size, page, generalData}) => {

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
                                        <Link href={`/services/${service.slug}`}>
                                            <a className="readmore stretched-link">Continue reading
                                                <Icon icon="eva:arrow-right-fill" className='icon2'/>
                                            </a>
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
        const paginationData = await listWithPagination(page, limit);
        const generalData = await list();

        if (!paginationData || !generalData) {
            return {
                notFound: true,
            };
        }
        if (paginationData.error || generalData.error) {
            console.log('error')
        }

        return {
            props: {
                paginationData: paginationData || {},
                page: page,
                size: limit,
                generalData: generalData || {},
            },
            revalidate: 60,  // Optional: re-generate the page at most once per minute
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            notFound: true,
        };
    }
};

export default Index;