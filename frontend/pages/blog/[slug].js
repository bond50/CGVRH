import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {getAllBlogSlugs, incrementViews, listRelated, singleBlog} from "../../actions/blog";
import {APP_NAME} from "../../config";
import Preloader from "../../components/preloader";
import SEOHead from "../../components/SEOHead";
import TrendingBlogs from "../../components/blog/TrendingBlogs";


const Card = dynamic(() => import("../../components/blog/Card"), {
    loading: () => <Preloader/>
});
const DisqusThread = dynamic(() => import("../../components/DiscussThread"), {
    loading: () => <Preloader/>
});
const BlogContainer = dynamic(() => import("../../hoc/BlogContainer"), {
    loading: () => <Preloader/>
});
const SmallCard = dynamic(() => import("../../components/reusables/card/small-card"), {
    loading: () => <Preloader/>
});
const Layout = dynamic(() => import("../../hoc/Layout"), {
    loading: () => <Preloader/>
});

const Slug = ({blog, query}) => {
    const [related, setRelated] = useState([]);

    const loadRelated = async () => {
        try {
            const data = await listRelated({blog});
            setRelated(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadRelated();
        incrementViews(query.slug);
    }, [blog]);

    const showBlog = () => <Card blog={blog} single/>;

    const showRelatedBlog = () => related.map(blog => (
        <div className="col-lg-4 col-md-6" key={blog._id}>
            <article>
                <SmallCard blog={blog}/>
            </article>
        </div>
    ));

    const showComments = () => (
        <div>
            <DisqusThread id={blog._id} title={blog.title} path={blog.slug}/>
        </div>
    );

    const additionalStructuredData = [
        {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.mtitle,
            "description": blog.mdesc,
            "image": blog.images && blog.images[0] ? blog.images[0].url : 'https://res.cloudinary.com/dwtcilinl/image/upload/v1721035726/others/image_rr6hhv.jpg',
            "author": {
                "@type": "Person",
                "name": blog.postedBy.name
            },
            "publisher": {
                "@type": "Organization",
                "name": APP_NAME,
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://res.cloudinary.com/dwtcilinl/image/upload/v1713525251/vc150_ti3ywx.png"
                }
            },
            "datePublished": blog.createdAt,
            "url": `https://vihigahospital.go.ke/blog/${blog.slug}`
        }
    ];

    return (
        <>
            <SEOHead
                title={`${blog.mtitle} | ${APP_NAME}`}
                description={blog.mdesc}
                url={`https://vihigahospital.go.ke/blog/${blog.slug}`}
                imageUrl={blog.images && blog.images[0] ? blog.images[0].url : 'https://res.cloudinary.com/dwtcilinl/image/upload/v1721035726/others/image_rr6hhv.jpg'}
                keywords={blog.keywords}
                author={blog.postedBy.name}
                additionalStructuredData={additionalStructuredData}
            />

            <Layout blog noHero noBread={true}>
                <section className="blog-detail-section">
                    <BlogContainer>
                        {showBlog()}
                        {/*<div className="pt-5">*/}
                        {/*    {showComments()}*/}
                        {/*</div>*/}

                    </BlogContainer>
                    <hr/>
                    <div className="container">
                        <h4 className="text-center pt-2 pb-2 h2">Related blogs</h4>
                        <div className="row">{showRelatedBlog()}</div>
                    </div>
                    <TrendingBlogs/>
                    {/*<div className="container py-4">*/}
                    {/*    <AdBanner/>*/}
                    {/*</div>*/}
                </section>
            </Layout>
        </>
    );
};

export const getStaticPaths = async () => {
    const slugs = await getAllBlogSlugs();
    const paths = slugs.map(slug => ({params: {slug}}));
    return {paths, fallback: 'blocking'};
};

export const getStaticProps = async ({params}) => {
    try {
        const data = await singleBlog(params.slug);

        if (!data) {
            return {notFound: true};
        }

        return {
            props: {blog: data, query: params},
            revalidate: 60,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {notFound: true};
    }
};

export default Slug;
