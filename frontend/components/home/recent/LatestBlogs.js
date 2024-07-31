import React from "react";
import Link from "next/link";
import useSWR from "swr";
import dayjs from "dayjs";
import { API, APP_NAME } from "../../../config";
import Image from "../../reusables/lazy/Image";
import Preloader from "../../preloader";
import { generateExcerpt } from "../../reusables/functions/generate-excerpt";
import classes from './RecentBlog.module.css';
import {Icon} from "@iconify/react";

const LatestBlogs = () => {
    const { data: blogs, error } = useSWR(`${API}/list-recent-blogs`);

    if (error) return <div>Failed to load recent blogs</div>;
    if (!blogs) return <Preloader />;

    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`;
    };

    return (
        <section className="section section-bg-1" data-aos="fade-up">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Latest News & Updates</h2>
                    <h3>
                        Stay Updated with Our <span> <Link href="/blog">Latest News</Link></span>
                    </h3>
                    <p>Discover the latest happenings, health tips, and updates at {APP_NAME}.</p>
                </div>

                <div className="row gy-5">
                    {blogs.map((blog, i) => {
                        const photoLink = blog.images && blog.images.length > 0
                            ? blog.images[Math.floor(Math.random() * blog.images.length)].url
                            : `${API}/blog/photo/${blog.slug}`;

                        return (
                            <div
                                key={i}
                                className={`col-xl-${blogs.length === 3 ? '4' : '3'} col-md-6`}
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <div className={classes.postBox}>
                                    <div className={classes.postImg}>
                                        <Link href={`/blog/${blog.slug}`} passHref>
                                            <a>
                                                <Image
                                                    width={720}
                                                    height={450}
                                                    loader={myLoader}
                                                    src={photoLink}
                                                    className="img-fluid"
                                                    alt={blog.title}
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className={classes.meta}>
                                        <span className={classes.postDate}>
                                            {dayjs(blog.createdAt).format("ddd, MMM D, YYYY h:mm A")}
                                        </span>
                                        {/*<span className={classes.postAuthor}>*/}
                                        {/*    / <Link href={`/profile/${blog.postedBy.username}`}>*/}
                                        {/*        <a>{blog.postedBy.username}</a>*/}
                                        {/*      </Link>*/}
                                        {/*</span>*/}
                                    </div>
                                    <h3 className={classes.postTitle}>
                                        <Link href={`/blog/${blog.slug}`}>
                                            {blog.title.toLowerCase()}
                                        </Link>
                                    </h3>
                                    <p>{generateExcerpt(blog.excerpt, 120)}</p>
                                    <Link href={`/blog/${blog.slug}`}>
                                        <a className={classes.readMore}>
                                            <span>Read Full Article</span>
                                             <Icon icon='bi:arrow-right' className={classes.icon}/>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LatestBlogs;
