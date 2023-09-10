import {listRelated, singleBlog,getAllBlogSlugs} from "../../actions/blog";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import BlogContainer from "../../hoc/BlogContainer";
import Card from "../../components/blog/Card";
import DisqusThread from "../../components/DiscussThread";
import SmallCard from "../../components/reusables/card/small-card";

import Layout from "../../hoc/Layout";

const Slug = ({blog, query}) => {

    const [related, setRelated] = useState([])

    const loadRelated = () => {
        listRelated({blog}).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setRelated(data)
            }
        })
    };

    useEffect(() => {
        loadRelated()
    }, [blog])

    const head = () => (
        <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc}/>
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`}/>
            <meta property="og:title" content={`${blog.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={blog.mdesc}/>
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`}/>
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    const showBlog = () => {

        return <Card blog={blog} single/>
    };


    const showRelatedBlog = () => {

        return related.map(blog => (
            <div className="col-lg-4 col-md-6" key={blog._id}>
                <article>
                    <SmallCard blog={blog}/>
                </article>
            </div>
        ));
    };


    const showComments = () => <div>
        <DisqusThread id={blog._id} title={blog.title} path={blog.slug}/>
    </div>;


    return (<Layout blog>
            <section >
                {head()}

                <main>

                    {/*<GeneralPageHeader*/}
                    {/*    imgSrc={`${API}/blog/photo/${blog.slug}`}*/}
                    {/*    title={blog.title}*/}
                    {/*    alt={blog.title}>*/}
                    <BlogContainer>
                        {showBlog()}
                        <div className='pt-5'>
                            {showComments()}
                        </div>
                    </BlogContainer>
                    <hr/>
                    <div className="container">
                        <h4 className="text-center pt-2 pb-2 h2">Related blogs</h4>
                        <div className="row">{showRelatedBlog()}</div>
                    </div>
                    {/*</GeneralPageHeader>*/}
                </main>

            </section>
        </Layout>
    );
};


export const getStaticPaths = async () => {
    // Fetch all possible slugs for pre-rendering
    const slugs = await getAllBlogSlugs(); // Replace with your API call to get all blog slugs
    const paths = slugs.map(slug => ({ params: { slug } }));
    return { paths, fallback: 'blocking' };
};

// This function gets called at build time for each path returned by getStaticPaths
export const getStaticProps = async ({ params }) => {
    return singleBlog(params.slug).then(data => {
        if (data.error) {
            console.log(data.error);
            return { notFound: true };
        } else {
            return {
                props: { blog: data, query: params },
                revalidate: 60,  // Optional: re-generate the page at most once per minute
            };
        }
    });
};

export default Slug
