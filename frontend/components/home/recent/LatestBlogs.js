import Link from "next/link";
import {API} from "../../../config";
import dayjs from "dayjs";
import Image from "next/image";
import useSWR from "swr";

import Preloader from "../../preloader";
import classes from './RecentBlog.module.css'
import React from "react";

import {generateExcerpt} from "../../reusables/functions/generate-excerpt";

const LatestBlogs = () => {


    const {data: blogs, error} = useSWR(`${API}/list-recent-blogs`)

    if (error) return <div>failed to load recent blogs</div>
    if (!blogs) return <Preloader/>

    return (
        <section className='section section-bg' data-aos="fade-up">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Latest News & Updates</h2>
                    <h3>Stay Updated with <span>Our Latest News</span></h3>

                    <p>Discover the latest happenings and updates at Vihiga County Referral Hospital. Stay connected
                        with our community for the most recent developments and news.
                    </p>

                </div>

                <div className="row gy-5">
                    {blogs && blogs.map((blog, i) => {

                        let photoLink = ''

                        if (blog.images && blog.images.length && blog.images.length > 0) {
                            const image = blog.images[Math.floor(Math.random() * blog.images.length)];
                            photoLink = image.url
                        } else {
                            photoLink = `${API}/blog/photo/${blog.slug}`
                        }


                        const myLoader = () => {
                            return photoLink;
                        }


                        return <div
                            className="col-xl-3 col-md-6"
                            data-aos="fade-up"
                            data-aos-delay="100" key={i + 1 + 100}>
                            <div className={classes.postBox}>
                                <div className={classes.postImg}>
                                    <Link href={`/blogs/${blog.slug}`}>
                                         <Image
                                        width={720}
                                        height={450}
                                        loader={myLoader}
                                        src={photoLink}
                                        className="img-fluid"
                                        alt={blog.title}/>
                                    </Link>

                                </div>
                                <div className={classes.meta}>
                                    <span
                                        className={classes.postDate}>{dayjs(blog.createdAt).format("ddd, MMM D, YYYY h:mm A")}</span>
                                    <span className={classes.postAuthor}> /
                                        <Link
                                            href={`/profile/${blog.postedBy.username}`}>
                                        <a>
                                            {blog.postedBy.username}
                                        </a>
                                    </Link>
                                    </span>
                                </div>
                                <h3 className={classes.postTitle}>

                                    <Link href={`/blogs/${blog.slug}`}>
                                        {blog.title.toLowerCase()}
                                    </Link>
                                </h3>

                                <p> {generateExcerpt(blog.excerpt, 120)}</p>

                                <Link href={`/blogs/${blog.slug}`}>
                                    <a className={`${classes.readMore}`}>
                                        <span> Read Full Article</span>
                                        <i className={`${classes.Icon} bi bi-arrow-right`}/>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </section>

    )
}

export default LatestBlogs;