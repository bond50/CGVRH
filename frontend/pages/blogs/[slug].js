import Layout from "../../hoc/Layout";
import {listBlogsWithCategoriesAndTags, listRelated, singleBlog} from "../../actions/blog";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import Link from "next/link";
import moment from "moment";
import classes from '../../styles/Blog.module.css'
import renderHTML from "react-render-html";
import Head from "next/head";
import React, {useState, useEffect} from "react";
import SmallCard from "../../components/blog/SmallCard";
import BlogContainer from "../../hoc/BlogContainer";
import BlogSideBarContent from "../../components/blog/BlogSideBarContent";
import Card from "../../components/blog/Card";

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
    }, [])

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
        return <Card blog={blog} single />

    };





    const showRelatedBlog = () => {

        return related.map((blog, i) => (
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
                <main>
                    <article>
                        <BlogContainer>
                            {showBlog()}

                        </BlogContainer>
                        {/*<div>*/}
                        {/*    <section className={classes.Section}>*/}
                        {/*        <div className="row" style={{marginTop: '-30px'}}>*/}
                        {/*            <img*/}
                        {/*                src={`${API}/blog/photo/${blog.slug}`}*/}
                        {/*                alt={blog.title}*/}
                        {/*                className="img img-fluid featured-image"*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </section>*/}

                        {/*    <section className={classes.Section}>*/}
                        {/*        <p className="lead mt-3 mark">*/}
                        {/*            Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}*/}
                        {/*        </p>*/}
                        {/*        <BlogSideBarContent/>*/}
                        {/*        <div className="pb-3">*/}
                        {/*            {showBlogCategories(blog)}*/}
                        {/*            {showBlogTags(blog)}*/}
                        {/*            <br/>*/}
                        {/*            <br/>*/}
                        {/*        </div>*/}
                        {/*    </section>*/}
                        {/*</div>*/}

                        {/*<div className="container">*/}
                        {/*    <h1 className="display-2 pb-3 pt-3 text-center ">{` ${blog.title}`}</h1>*/}
                        {/*    <section className={classes.Section}>*/}
                        {/*        <div className="col-md-12 lead">{renderHTML(blog.body)}</div>*/}
                        {/*    </section>*/}
                        {/*</div>*/}

                        {/*<div className="container">*/}
                        {/*    <h4 className="text-center pt-2 pb-2 h2">Related blogs</h4>*/}
                        {/*    <div className="row">{showRelatedBlog()}</div>*/}
                        {/*</div>*/}

                        {/*<div className="container pb-5">*/}
                        {/*    <p>show comments</p>*/}
                        {/*</div>*/}
                    </article>
                </main>
            </Layout>
        </>
    );
};


export const getServerSideProps = async ({query}) => {

    return singleBlog(query.slug).then(data => {

        if (data.error) {
            console.log(data.error)
        } else {
            return {
                props: {blog: data, query}

            }
        }
    })
}
export default Slug