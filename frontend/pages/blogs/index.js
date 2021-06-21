import Head from "next/head";
import React, {useState} from "react";
import Layout from "../../hoc/Layout";
import {listBlogsWithCategoriesAndTags} from "../../actions/blog";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import classes from '../../styles/Blog.module.css'
import Card from "../../components/blog/Card";
import {withRouter} from "next/router";
import BlogContainer from "../../hoc/BlogContainer";


const Blogs = ({blogs, totalBlogs, blogsLimit, blogSkip, router}) => {

    const head = () => (
        <Head>
            <title> Blogs || {APP_NAME} </title>
            <meta name='description'
                  content='Vihiga county referral hospital blog on our services departments wards core values strategic plan'/>
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:title" content={`Latest blogs | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content="Vihiga county referral hospital blog on our services departments wards core values strategic plan"
            />
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image"
                  content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}/>
            <meta property="og:image:secure_url"
                  content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );


    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-secondary  btn-sm">
                    Load more
                </button>
            )
        );
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <article key={i} className={classes.Entry}>
                    <Card blog={blog}/>
                </article>
            );
        });
    };


    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article key={i} className={classes.Entry}>
                <Card blog={blog}/>
            </article>
        ));
    }


    return (
        <>
            {head()}
            <Layout>
                <main>
                    <BlogContainer>
                        {showAllBlogs()}
                        {showLoadedBlogs()}
                        <div className="text-center pb-3">
                            {loadMoreButton()}
                        </div>
                    </BlogContainer>
                </main>
            </Layout>
        </>
    );
};


export const getServerSideProps = async (context) => {
    let skip = 0
    let limit = 2
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {

            return {
                props: {
                    blogs: data.blogs,
                    totalBlogs: data.size,
                    blogsLimit: limit,
                    blogSkip: skip
                }
            }
        }
    })
}

export default withRouter(Blogs);