import {singleCategory, getAllCategorySlugs} from "../../actions/category";
import dynamic from "next/dynamic";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import React from "react";
import Preloader from "../../components/preloader";
import AdBanner from "../../components/AdBanner";

const SmallCard = dynamic(() => import("../../components/reusables/card/small-card"), {
    ssr: false,
    loading: () => <Preloader/>
});
const Layout = dynamic(() => import("../../hoc/Layout"), {
    ssr: false,
    loading: () => <Preloader/>
});

const Category = ({category, blogs, query}) => {
    const head = () => (
        <Head>
            <title>{category.name} | {APP_NAME}</title>
            <meta name="description" content={`${APP_NAME} blog on ${category.title}`}/>
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`}/>
            <meta property="og:title" content={`${category.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={`${APP_NAME} blog on ${category.title}`}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={`/herp.jpg`}/>
            <meta property="og:image:secure_url" content={`/herp.jpg`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
            <meta name="keywords" content={`${category.title}, blog, ${APP_NAME}`}/>
            <meta name="author" content={`${APP_NAME}`}/>
        </Head>
    );

    const showCats = () => {
        return blogs.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog}/>
                </article>
            </div>
        ));
    };

    return (
        <>
            {head()}
            <Layout blog noBread>
                <section className="blog-section">
                    <div className="container mt-2">
                        <div className="row">{showCats()}</div>
                    </div>
                      <AdBanner/>
                </section>
            </Layout>
        </>
    );
};

export const getStaticProps = async ({params}) => {
    const data = await singleCategory(params.slug, 'category');
    if (data.error) {
        console.log(data.error);
        return {
            notFound: true,
        };
    } else {
        return {
            props: {
                category: data.category,
                blogs: data.blogs,
                query: params,
            },
            revalidate: 60,
        };
    }
};

export const getStaticPaths = async () => {
    const paths = await getAllCategorySlugs();
    return {
        paths,
        fallback: 'blocking',
    };
};

export default Category;
