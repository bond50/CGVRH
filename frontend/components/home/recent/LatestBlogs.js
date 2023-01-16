import Link from "next/link";
import {API} from "../../../config";
import dayjs from "dayjs";
import renderHTML from "html-react-parser";
import Image from "next/image";
import useSWR from "swr";

import Preloader from "../../preloader";
import classes from './RecentBlog.module.css'

const LatestBlogs = () => {


    const {data: blogs, error} = useSWR(`${API}/list-recent-blogs`)

    if (error) return <div>failed to load recent blogs</div>
    if (!blogs) return <Preloader/>

    return (
        <section className='section section-bg'>
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Latest events</h2>
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


                        return <div className="col-xl-4 col-md-6 "
                                    data-aos="fade-up"
                                    data-aos-delay="100" key={i + 1 + 100}>
                            <div className={classes.postBox}>
                                <div className={classes.postImg}>
                                    <Image
                                        width={720}
                                        height={450}
                                        loader={myLoader}
                                        src={photoLink}
                                        className="img-fluid"
                                        alt={blog.title}/>
                                </div>
                                <div className={classes.meta}>
                                    <span
                                        className={classes.postDate}>{dayjs(blog.updatedAt).format("ddd, MMM D, YYYY h:mm A")}</span>
                                    <span className={classes.postAuthor}> / {blog.postedBy.username}</span>
                                </div>
                                <h3 className={classes.postTitle}>{blog.title.toLowerCase()}</h3>
                                {renderHTML(blog.excerpt.length >= 80 ? `${blog.excerpt.substring(0, 80)}...` : blog.excerpt)}
                                <Link href={`/blogs/${blog.slug}`}>
                                    <a className={`${classes.readMore}  stretched-link`}>
                                        <span> Read more on {blog.title}</span>
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