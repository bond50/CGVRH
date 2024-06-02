import Head from "next/head";
import React, { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API, APP_NAME, DOMAIN } from "../../config";
import { withRouter } from "next/router";
import SmallCard from "../../components/reusables/card/small-card";
import Layout from "../../hoc/Layout";

const Blogs = ({ blogs, totalBlogs, blogsLimit, router }) => {
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
                    className="btn btn-outline-secondary btn-sm"
                >
                    Load more
                </button>
            )
        );
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="col-lg-4">
                    <SmallCard blog={blog} isPriority={i === 0} />
                </div>
            );
        });
    };

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <div key={i} className="col-lg-4">
                <SmallCard blog={blog} />
            </div>
        ));
    };

    return (
        <>
            <Head>
                <title>Health & Wellness Articles | Vihiga County Referral Hospital Blog</title>
                <meta
                    name="description"
                    content="Discover articles on health, wellness, fitness, and mental health from Vihiga County Referral Hospital."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="health, wellness, fitness, mental health, Vihiga County, medical services" />
                <meta name="author" content="Vihiga County Referral Hospital" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
                <meta property="og:title" content="Health & Wellness Articles | Vihiga County Referral Hospital Blog" />
                <meta
                    property="og:description"
                    content="Explore our latest articles on health, wellness, fitness, and mental health."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
                <meta property="og:site_name" content={`${APP_NAME}`} />

                {blogs.length > 0 && (
                    <>
                        <meta
                            property="og:image"
                            content={blogs[0].images && blogs[0].images.length > 0
                                ? blogs[0].images[0].url.replace('/upload/', '/upload/f_auto,q_auto/')
                                : `${API}/blog/photo/${blogs[0].slug}`}
                        />
                        <meta
                            property="og:image:secure_url"
                            content={blogs[0].images && blogs[0].images.length > 0
                                ? blogs[0].images[0].url.replace('/upload/', '/upload/f_auto,q_auto/')
                                : `${API}/blog/photo/${blogs[0].slug}`}
                        />
                        <link
                            rel="preload"
                            as="image"
                            href={blogs[0].images && blogs[0].images.length > 0
                                ? blogs[0].images[0].url.replace('/upload/', '/upload/f_auto,q_auto/')
                                : `${API}/blog/photo/${blogs[0].slug}`}
                        />
                    </>
                )}

                {/* Twitter Card Metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@your_twitter_handle" />
                <meta name="twitter:title" content="Health & Wellness Articles | Vihiga County Referral Hospital Blog" />
                <meta name="twitter:description" content="Explore our latest articles on health, wellness, fitness, and mental health." />
                {blogs.length > 0 && (
                    <meta name="twitter:image" content={blogs[0].images && blogs[0].images.length > 0
                        ? blogs[0].images[0].url.replace('/upload/', '/upload/f_auto,q_auto/')
                        : `${API}/blog/photo/${blogs[0].slug}`}
                    />
                )}

                {/* Schema.org markup for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "url": DOMAIN,
                        "name": APP_NAME,
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": `${DOMAIN}/search?q={search_term_string}`,
                            "query-input": "required name=search_term_string"
                        }
                    })}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Hospital",
                        "name": APP_NAME,
                        "url": DOMAIN,
                        "logo": `https://asset.cloudinary.com/dwtcilinl/b640e6d08f8574e718edca77a4bd1164`,
                        "sameAs": [
                            "https://www.facebook.com/profile.php?id=100063774356598"
                        ]
                    })}
                </script>

                {/* Article structured data for individual blogs */}
                {blogs.map(blog => (
                    <script key={blog._id} type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": `${DOMAIN}/blogs/${blog.slug}`
                            },
                            "headline": blog.title,
                            "image": {
                                "@type": "ImageObject",
                                "url": blog.images && blog.images.length > 0
                                    ? blog.images[0].url.replace('/upload/', '/upload/f_auto,q_auto/')
                                    : `${API}/blog/photo/${blog.slug}`,
                                "width": 720,
                                "height": 450
                            },
                            "datePublished": blog.createdAt,
                            "author": {
                                "@type": "Person",
                                "name": blog.postedBy.username
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": APP_NAME,
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": `https://asset.cloudinary.com/dwtcilinl/b640e6d08f8574e718edca77a4bd1164`
                                }
                            },
                            "description": blog.excerpt
                        })}
                    </script>
                ))}
            </Head>

            <Layout blog>

                    <section className="blog-section">
                        <div className="container">
                            <div className="row">
                                {showAllBlogs()}
                                {showLoadedBlogs()}
                            </div>
                            <div className="text-center pb-3">{loadMoreButton()}</div>
                        </div>
                    </section>

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
                revalidate: 60, // Re-generate the page at most once per minute
            };
        }
    });
};

export default withRouter(Blogs);
