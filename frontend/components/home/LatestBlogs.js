import React, {useEffect, useState} from 'react';
import styles from "../../styles/Util.module.css";
import Link from "next/link";
import classes from '../../styles/RecenntFromBlog.module.css'
import {listBlogsWithCategoriesAndTags} from "../../actions/blog";
import {useRouter} from "next/router";
import {API} from "../../config";
import moment from "moment";
import renderHTML from "react-render-html";

const LatestBlogs = () => {
    const router = useRouter()

    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        loadBlogs()
    }, [])


    const loadBlogs = () => {
        let skip = 0
        let limit = 4
        return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setBlogs(data.blogs)
            }
        })
    };


    const showRecent = () => {
        return blogs.map((blog, index) => {
            return <div className="col-lg-3" key={index} data-aos="fade-up" data-aos-delay='200' data-aos-once='true'>
                <div className={classes.PostBox}>
                    <div className={classes.PostImg}>
                        <img
                            src={`${API}/blog/photo/${blog.slug}`}
                            className="img-fluid"
                            alt={blog.title}/>
                    </div>
                    <span className={classes.PostDate}> {moment(blog.updatedAt).fromNow()}</span>
                    <h3 className={classes.PostTitle}>{renderHTML(blog.excerpt.length > 90 ? `${blog.excerpt.substring(0, 90)}...` : blog.excerpt)}</h3>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className={`${classes.Btn} stretched-link mt-auto`}>
                            <span>Read More</span><i
                            className="bi bi-arrow-right"/>
                        </a>
                    </Link>
                </div>
            </div>
        })
    }


    return (
        <section className={`${styles.Section}`}>
            <div className="container" data-aos="fade-up" data-aos-once='true'>
                <header className={styles.SectionTitle}>
                    <h2>Blog</h2>
                    <p>Recent posts form our Blog</p>
                </header>
                <div className="row">
                    {showRecent()}
                </div>
            </div>

        </section>

    )
}

export default LatestBlogs;