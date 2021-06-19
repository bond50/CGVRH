import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import {API} from '../../config';
import classes from '../../styles/BlogCard.module.css'

const Card = ({blog}) => {
    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mx-1 ">{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mx-1 ">{t.name}</a>
            </Link>
        ));

    return (
        <div className="lead pb-2">
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
                    </a>
                </Link>
            </header>
            <section className={classes.Section}>
                <p className="mark  pt-2 pb-2">
                    Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                </p>
            </section>
            <section>
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
                <br/>
                <br/>
            </section>

            <div className="row">
                <div className="col-md-4">
                    <section className={classes.Section}>
                        <img
                            className="img img-fluid"
                            src={`${API}/blog/photo/${blog.slug}`}
                            style={{width:'100%',height:'auto'}}
                            alt={blog.title}
                        />
                    </section>
                </div>
                <div className="col-md-8">
                    <section className={classes.Section}>
                        <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="btn btn-primary pt-2">Read more</a>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Card;