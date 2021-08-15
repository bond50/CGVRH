import Layout from "../../hoc/Layout";
import {singleCategory} from "../../actions/category";
import Card from "../../components/blog/Card";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import classes from '../../styles/Util.module.css'
import SmallCard from "../../components/blog/SmallCard";
import React from "react";


const Category = ({category, blogs, query}) => {
    const head = () => (
        <Head>
            <title>
                {category.name} | {APP_NAME}
            </title>
            <meta name="description" content={`${APP_NAME} blog on ${category.name}`}/>
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`}/>
            <meta property="og:title" content={`${category.name}| ${APP_NAME}`}/>
            <meta property="og:description" content={`${APP_NAME} blog on ${category.name}`}/>
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image"
                  content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}/>
            <meta property="og:image:secure_url"
                  content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}/>
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
                <div className="container">
                    <h4 className="text-center pt-4 pb-4 h1">Articles on {category.name}</h4>
                    <div className="row">{showCats()}</div>
                </div>

                {/*<main>*/}
                {/*    <div className="container ">*/}
                {/*        <header className={classes.Header}>*/}
                {/*            <h1>{category.name.toLowerCase()}</h1>*/}
                {/*            {blogs.map((b, i) => {*/}
                {/*                    return <div className="col-md-4">*/}
                {/*                            <Card key={i} blog={b}/>*/}
                {/*                            <hr/>*/}

                {/*                    </div>*/}
                {/*                }*/}
                {/*            )}*/}

                {/*        </header>*/}
                {/*    </div>*/}
                {/*</main>*/}

            </Layout>
        </>
    );
};
export const getServerSideProps = async ({query}) => {

    return singleCategory(query.slug).then(data => {
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