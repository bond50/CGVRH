import styles from "../../styles/Util.module.css";
import Link from "next/link";
import classes from '../../styles/RecenntFromBlog.module.css'
import {API} from "../../config";
import moment from "moment";
import renderHTML from "react-render-html";
import Image from "next/image";
import useSWR from "swr";

const LatestBlogs = () => {

    const {data: blogs, error: blogsError} = useSWR(`${API}/list-recent-blogs`)
    if (blogsError) return <div className='container uh-oh mt-5 pt-5 '><p>uh oh something is
        wrong..Please
        contact Vihiga county referral hospital ICT team for assistance.Thank you </p></div>
    if (!blogs) return <div className='preloader'/>


    const showRecent = () => {
        return blogs && blogs.map((blog) => {
            return <div className="col-lg-4 " key={blog._id}>
                <div className={classes.PostBox}>
                    <div className={classes.PostImg}>
                        <Image
                            width={2560}
                            height={1600}
                            src={`${API}/blog/photo/${blog.slug}`}
                            className="img-fluid"
                            alt={blog.title}/>
                    </div>
                    <span className={classes.PostDate}> {moment(blog.updatedAt).fromNow()}</span>
                    <h3 className={classes.PostTitle}>{blog.title.toLowerCase()}</h3>
                    {renderHTML(blog.excerpt.length >= 160 ? `${blog.excerpt.substring(0, 160)}...` : blog.excerpt)}
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
        <section className={`${styles.Section} ${classes.SectionBg}`}>
            <div className="container">
                <header className={styles.SectionTitle}>
                    <h2>Recent News and Events</h2>
                </header>
                <div className="row">
                    {showRecent()}
                </div>
            </div>
        </section>

    )
}

export default LatestBlogs;