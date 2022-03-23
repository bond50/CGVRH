import {singleCategory} from "../../actions/category";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import React from "react";
import SmallCard from "../../components/reusables/card/small-card";
import Layout from "../../hoc/Layout";


const Category = ({category, blogs, query}) => {
    const head = () => (
        <Head>
            <title>
                {category.title} | {APP_NAME}
            </title>
            <meta name="description" content={`${APP_NAME} blog on ${category.title}`}/>
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`}/>
            <meta property="og:title" content={`${category.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={`${APP_NAME} blog on ${category.title}`}/>
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image"
                  content={`/herp.jpg`}/>
            <meta property="og:image:secure_url"
                  content={`/herp.jpg`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
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
            <Layout>
                <section className='blog-section'>
                    <div className="container mt-2">
                        <div className="row">{showCats()}</div>
                    </div>
                </section>
            </Layout>
        </>
    );
};
export const getServerSideProps = async ({query}) => {

    return singleCategory(query.slug, 'category').then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return {
                props: {
                    category: data.category,
                    blogs: data.blogs,
                    query
                }
            }
        }
    })
}

export default Category;