import Layout from "../../hoc/Layout";
import {listBlogsWithCategoriesAndTags, listRelated, singleBlog} from "../../actions/blog";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import Link from "next/link";
import moment from "moment";
import classes from '../../styles/Singleblog.module.css'
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
        return <Card blog={blog} single/>
    };


    function showBlogComments() {
        return <div className={classes.Comments}>
            <h4 className={classes.CommentCount}>8 Comments</h4>
            <div className={classes.Comment}>
                <div className="d-flex">
                    <div className={classes.Image}><img src="assets/img/blog/comments-1.jpg" alt=""/></div>
                    <div>
                        <h5><a href="">Georgia Reader</a> <a href="#" className={classes.Reply}><i
                            className="bi bi-reply-fill"/> Reply</a></h5>
                        <time dateTime="2020-01-01">01 Jan, 2020</time>
                        <p>
                            Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad aut sapiente
                            quis molestiae est qui cum soluta.
                            Vero aut rerum vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.
                        </p>
                    </div>
                </div>
            </div>

            <div className={classes.Form}>
                <h4>Leave a Reply</h4>
                <p>Your email address will not be published. Required fields are marked * </p>

                <form>
                    <div className="row">
                        <div className={`col-md-6 form-group ${classes.FormGroup}`}>
                            <input name="name" type="text" className="form-control" placeholder="Your Name*"/>
                        </div>
                        <div className={`col-md-6 form-group ${classes.FormGroup}`}>
                            <input name="email" type="text" className="form-control" placeholder="Your Email*"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`col form-group ${classes.FormGroup}`}>
                            <input name="website" type="text" className="form-control" placeholder="Your Website"/>
                        </div>
                    </div>
                    <div className="row">
                         <div className={`col form-group ${classes.FormGroup}`}>
                            <textarea name="comment" className="form-control" placeholder="Your Comment*"></textarea>
                        </div>
                    </div>
                    <button type="submit" className={`btn btn-primary ${classes.Btn}`}>Post Comment</button>

                </form>

            </div>

        </div>


    }

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

                              {showBlogComments()}

                        </BlogContainer>
                        <hr/>
                          <div className="container">
                                <h4 className="text-center pt-2 pb-2 h2">Related blogs</h4>
                                <div className="row">{showRelatedBlog()}</div>
                            </div>

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

// import React from 'react'
// import Head from 'next/head';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { singleBlog, listRelated } from '../../actions/blog';
// import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
// import renderHTML from 'react-render-html';
// import moment from 'moment';
// import SmallCard from '../../components/blog/SmallCard';
// import Layout from "../../hoc/Layout";
//
// const SingleBlog = ({ blog, query }) => {
//     const [related, setRelated] = useState([]);
//
//     const loadRelated = () => {
//         listRelated({ blog }).then(data => {
//             if (data.error) {
//                 console.log(data.error);
//             } else {
//                 setRelated(data);
//             }
//         });
//     };
//
//     useEffect(() => {
//         loadRelated();
//     }, []);
//
//     const head = () => (
//         <Head>
//             <title>
//                 {blog.title} | {APP_NAME}
//             </title>
//             <meta name="description" content={blog.mdesc} />
//             <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
//             <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
//             <meta property="og:description" content={blog.mdesc} />
//             <meta property="og:type" content="webiste" />
//             <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
//             <meta property="og:site_name" content={`${APP_NAME}`} />
//
//             <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
//             <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
//             <meta property="og:image:type" content="image/jpg" />
//             <meta property="fb:app_id" content={`${FB_APP_ID}`} />
//         </Head>
//     );
//
//     const showBlogCategories = blog =>
//         blog.categories.map((c, i) => (
//             <Link key={i} href={`/categories/${c.slug}`}>
//                 <a className="btn btn-primary mx-1 mt-3">{c.name}</a>
//             </Link>
//         ));
//
//     const showBlogTags = blog =>
//         blog.tags.map((t, i) => (
//             <Link key={i} href={`/tags/${t.slug}`}>
//                 <a className="btn btn-outline-primary mx-1 mt-3">{t.name}</a>
//             </Link>
//         ));
//
//     const showRelatedBlog = () => {
//         return related.map((blog, i) => (
//             <div className="col-md-4" key={i}>
//                 <article>
//                     <SmallCard blog={blog} />
//                 </article>
//             </div>
//         ));
//     };
//
//     return (
//         <React.Fragment>
//             {head()}
//             <Layout>
//                 <main>
//                     <article>
//                         <div className="container-fluid">
//                             <section>
//                                 <div className="row" style={{ marginTop: '-30px' }}>
//                                     <img
//                                         src={`${API}/blog/photo/${blog.slug}`}
//                                         alt={blog.title}
//                                         className="img img-fluid featured-image"
//                                     />
//                                 </div>
//                             </section>
//
//                             <section>
//                                 <div className="container">
//                                     <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">{blog.title}</h1>
//                                     <p className="lead mt-3 mark">
//                                         Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
//                                     </p>
//
//                                     <div className="pb-3">
//                                         {showBlogCategories(blog)}
//                                         {showBlogTags(blog)}
//                                         <br />
//                                         <br />
//                                     </div>
//                                 </div>
//                             </section>
//                         </div>
//
//                         <div className="container">
//                             <section>
//                                 <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
//                             </section>
//                         </div>
//
//                         <div className="container">
//                             <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
//                             <div className="row">{showRelatedBlog()}</div>
//                         </div>
//
//                         <div className="container pb-5">
//                             <p>show comments</p>
//                         </div>
//                     </article>
//                 </main>
//             </Layout>
//         </React.Fragment>
//     );
// };
//
// SingleBlog.getInitialProps = ({ query }) => {
//     return singleBlog(query.slug).then(data => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             return { blog: data, query };
//         }
//     });
// };
//
// export default SingleBlog;