import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import {list, listWithPagination} from "../../actions/general";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import {useRouter} from "next/router";
import Layout from "../../hoc/Layout";
import {Icon} from '@iconify/react';
import {generateExcerpt} from "../../components/reusables/functions/generate-excerpt";
import Pagination from 'rc-pagination';
import PageWrapper from "../../hoc/page-wrapper";

const Index = ({paginationData, size, page, generalData}) => {
    const router = useRouter();

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



    const PerPageChange = (value) => {
        setLimit(value);
        const newPerPage = Math.ceil(totalCount / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    };

    const PaginationChange = (pg, pgSize) => {
        setCurrent(pg);
        setLimit(pgSize);
    };

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === "prev") {
            return <button><Icon icon="fluent:arrow-left-48-regular"/></button>;
        }
        if (type === "next") {
            return <button><Icon icon="fluent:arrow-right-48-regular"/></button>;
        }
        return originalElement;
    };


    return (
        <>
            {head()}
            <Layout pages={generalData} >

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

                        <div className="d-flex justify-content-center pagination">
                            <Pagination
                                className="pagination-data"
                                showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                onChange={PaginationChange}
                                total={totalCount}
                                current={current}
                                pageSize={limit}
                                showSizeChanger={false}
                                itemRender={PrevNextArrow}
                                onShowSizeChange={PerPageChange}
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

        if (paginationData.error) {
            console.log(paginationData.error);
        }

        if (generalData.error) {
            console.log(generalData.error);
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
            props: {
                error: 'Failed to fetch data',
            },
            revalidate: 60,
        };
    }
};
export default Index;