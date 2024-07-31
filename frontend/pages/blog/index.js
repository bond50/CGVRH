import React, {useState} from "react";
import {listBlogsWithCategoriesAndTags} from "../../actions/blog";
import {withRouter} from "next/router";
import dynamic from "next/dynamic";
import Preloader from "../../components/preloader";
import SEOHead from "../../components/SEOHead";
import {APP_NAME} from "../../config";
import AdBanner from "../../components/adsense/AdBanner";

const SmallCard = dynamic(() => import("../../components/reusables/card/small-card"), {
    ssr: false,
    loading: () => <Preloader/>
});
const Layout = dynamic(() => import("../../hoc/Layout"), {
    ssr: false,
    loading: () => <Preloader/>
});
const Blogs = ({blogs, totalBlogs, blogsLimit, seoSettings}) => {


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
                    <SmallCard blog={blog} isPriority={i === 0}/>
                </div>
            );
        });
    };

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <div key={i} className="col-lg-4">
                <SmallCard blog={blog}/>
            </div>
        ));
    };

    const {
        author,
        description,
        imageUrl,
        keywords,
        locale,
        themeColor,
        title,
        page,


    } = seoSettings || {};


    const additionalStructuredData = [
        {
            "@context": "https://schema.org",
            "@type": "Blog",
            "url": "https://vihigahospital.go.ke/blog",
            "name": `${APP_NAME} Blog`,
            "description": description,
            "publisher": {
                "@type": "Organization",
                "name": APP_NAME,
                "logo": {
                    "@type": "ImageObject",
                    "url": imageUrl
                }
            },
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vihigahospital.go.ke/blog/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        }
    ];


    return (
        <>
            <SEOHead
                title={title}
                description={description}
                url={page?.url || 'https://vihigahospital.go.ke/blog'}
                imageUrl={imageUrl}
                keywords={keywords}
                themeColor={themeColor}
                locale={locale}
                author={author}
                additionalStructuredData={additionalStructuredData}

            />
            <Layout blog noBread>
                <section className="blog-section">
                    <div className="container">
                        <div className="row">
                            {showAllBlogs()}
                            {showLoadedBlogs()}
                              <AdBanner/>
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
            return {
                props: {
                    blogs: [],
                    categories: [],
                    totalBlogs: 0,
                    blogsLimit: limit,
                    blogSkip: skip,
                    seoSettings: null
                },
                revalidate: 60, // Re-generate the page at most once per minute
            };
        } else {
            return {
                props: {
                    blogs: data.blogs,
                    categories: data.categories,
                    totalBlogs: data.size,
                    blogsLimit: limit,
                    blogSkip: skip,
                    seoSettings: data.seoSettings[0] // Ensure you are passing the first item of the seoSettings array
                },
                revalidate: 60, // Re-generate the page at most once per minute
            };
        }
    });
};

export default withRouter(Blogs);
