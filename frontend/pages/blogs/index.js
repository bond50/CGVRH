import Head from "next/head";
import React, {useState} from "react";
import {listBlogsWithCategoriesAndTags} from "../../actions/blog";
import {APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import {withRouter} from "next/router";
import SmallCard from "../../components/reusables/card/small-card";
import Layout from "../../hoc/Layout";



const Blogs = ({blogs, totalBlogs, blogsLimit, router}) => {

    const head = () => (
        <Head>
            <title>Blogs | {APP_NAME}</title>
            <meta
                name="description"
                content="Vihiga county referral hospital blog on our services departments wards core values strategic plan"
            />

            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>

            <meta property="og:title" content={`Latest articles | ${APP_NAME}`}/>
            <meta
                property="og:description"
                content="Vihiga county referral hospital blog on our services departments wards core values strategic plan"
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

    const [limit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
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
                <button
                    onClick={loadMore}
                    className="btn btn-outline-secondary  btn-sm"
                >
                    Load more
                </button>
            )
        );
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className='col-lg-4'>
                    <SmallCard blog={blog}/>
                </div>
            );
        });
    };

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <div key={i} className='col-lg-4'>
                <SmallCard blog={blog}/>
            </div>
        ));
    };


    return (
        <>
            {head()}
            <Layout blog>
                <main>
                    <section className='blog-section'>
                        <div className="container ">
                            <div className='row'>
                                {showAllBlogs()}
                                {showLoadedBlogs()}
                            </div>
                            <div className="text-center pb-3">{loadMoreButton()}</div>
                        </div>
                    </section>
                </main>
            </Layout>
        </>
    );
};

export const getStaticProps = async () => {
    let skip = 0;
    let limit = 6;
    return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                props: {
                    blogs: data.blogs,
                    categories: data.categories,
                    totalBlogs: data.size,
                    blogsLimit: limit,
                    blogSkip: skip,
                },
                revalidate: 60,  // Re-generate the page at most once per minute
            };
        }
    });
};


export default withRouter(Blogs);
