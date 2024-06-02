import {singleTag,getAllTagSlugs} from "../../actions/tag";
import Head from "next/head";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import React from "react";
import SmallCard from "../../components/reusables/card/small-card";
import Layout from "../../hoc/Layout";

const Tag = ({tag, blogs, query}) => {
    const head = () => (
        <Head>
            <title>
                {tag.name} | {APP_NAME}
            </title>
            <meta name="description" content={`${APP_NAME} blog on ${tag.title}`}/>

            <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`}/>
            <meta property="og:title" content={`${tag.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={`${APP_NAME} blog on ${tag.title}`}/>
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image"
                  content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}/>
            <meta property="og:image:secure_url"
                  content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    return (
        <>
            {head()}
            <Layout blog>
                <section className='blog-section'>
                    <div className="container mt-2">
                        <div className="row">
                            {blogs.map(blog => {
                                return <div className="col-md-4" key={blog._id}>
                                    <article>
                                        <SmallCard blog={blog}/>
                                    </article>
                                </div>
                            })}
                        </div>
                    </div>
                </section>

                {/*<main>*/}
                {/*    <div className="container">*/}
                {/*        <header className={classes.Header}>*/}
                {/*            <div className="col-md-12 pt-3">*/}
                {/*                <h1 className="display-4 font-weight-bold">{tag.name}</h1>*/}
                {/*                {blogs.map((b, i) => {*/}
                {/*                        return <div>*/}
                {/*                            <Card key={i} blog={b}/>*/}
                {/*                            <hr/>*/}
                {/*                        </div>*/}
                {/*                    }*/}
                {/*                )}*/}
                {/*            </div>*/}
                {/*        </header>*/}
                {/*    </div>*/}
                {/*</main>*/}

            </Layout>
        </>
    )

};
export const getStaticProps = async ({params}) => {
    const data = await singleTag(params.slug, 'tag');
    if (data.error) {
        console.log(data.error);
        return {
            notFound: true,
        };
    } else {
        return {
            props: {
                tag: data.tag,
                blogs: data.blogs,
                query: params,
            },
            revalidate: 60, // ISR, re-generate the page every 60 seconds
        };
    }
};

export const getStaticPaths = async () => {
    // Fetch all slugs and return them
    const paths = await getAllTagSlugs(); // Implement this function to fetch all slugs
    return {
        paths,
        fallback: 'blocking',
    };
};
export default Tag;