import styles from "../../styles/Util.module.css";
import Link from "next/link";
import classes from '../../styles/RecenntFromBlog.module.css'
import {API} from "../../config";
import moment from "moment";
import renderHTML from "react-render-html";

const LatestBlogs = ({blogs}) => {
    const showRecent = () => {
        return blogs && blogs.map((blog, index) => {
            return <div className="col-lg-4 " key={index} data-aos="fade-up" data-aos-delay='200' data-aos-once='true'>
                <div className={classes.PostBox}>
                    <div className={classes.PostImg}>
                        <img
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
            <div className="container" data-aos="fade-up" data-aos-once='true'>
                <header className={styles.SectionTitle}>
                    <h2>Recent news</h2>
                </header>
                <div className="row">
                    {showRecent()}
                </div>
            </div>
        </section>

    )
}

export default LatestBlogs;