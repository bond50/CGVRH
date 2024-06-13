import classes from '../../styles/LoadRecent.module.css'
import Link from "next/link";
import {API} from "../../config";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const LoadRecentBlogs = ({blogs}) => {

    const recent = () => {
        return blogs && blogs.map((blog, index) => {
            let imgSrc = `${API}/blog/photo/${blog.slug}`
            const relativeDate = dayjs(blog.updatedAt).fromNow();
            if (blog.images && blog.images.length && blog.images.length > 0) {
                const image = blog.images[Math.floor(Math.random() * blog.images.length)];
                imgSrc = image.url
            }


            return <div className={`${classes.Item} clearfix`} key={index}>
                <img className="img img-fluid" src={imgSrc} alt={blog.title}/>
                <h4>
                    <Link href={`/blogs/${blog.slug}`} key={index}>
                        <a> {blog.title.toLowerCase()}</a>
                    </Link>
                </h4>
                <div className={classes.Time}>
                    <span>Modified {relativeDate}</span>
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