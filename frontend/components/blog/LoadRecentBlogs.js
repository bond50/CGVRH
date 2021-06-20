import classes from '../../styles/LoadRecent.module.css'
import moment from "moment";
import Link from "next/link";
import {API} from "../../config";
const LoadRecentBlogs = ({blogs}) => {
    const recent = () => {
        return blogs&&blogs.map((blog, index) => {
            return <div className={`${classes.Item} clearfix`} key={index}>
                <img className="img img-fluid" src={`${API}/blog/photo/${blog.slug}`} alt={blog.title}/>
                <h4>
                    <Link href={`/blogs/${blog.slug}`} key={index}>
                        <a> {blog.title.toLowerCase()}</a>
                    </Link>
                </h4>
                <div className={classes.Time}>
                    {moment(blog.updatedAt).fromNow()}
                </div>
            </div>
        })
    }


    return (
        <div className={classes.Recent}>
            {recent()}
        </div>


    )
        ;
};

export default LoadRecentBlogs;