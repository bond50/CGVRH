import Link from 'next/link';
import React, {Fragment} from "react";
import Image from "next/image";
import renderHTML from 'react-render-html';
import moment from 'moment';
import {API} from '../../config';
import classes from '../../styles/BlogCard.module.css'


const Card = ({blog, single}) => {
    const showBlogTags = () =>
        blog.tags.map((t, i) => (
            <li key={i}>
                <Link href={`/tags/${t.slug}`}>
                    <a> {t.name}</a>
                </Link>
            </li>

        ));

    function showCats() {
        return blog.categories.map((c, i) => (
            <li key={i}>
                <Link href={`/categories/${c.slug}`}>
                    <a>{c.name}</a>
                </Link>
            </li>

        ))
    }

    const myLoader = ({src}) => {
        return `${API}/blog/photo/${blog.slug}`;
    }
    return (
        <article className={classes.Entry}>
            <div className={classes.Image}>
                <Link href={`/blogs/${blog.slug}`}>
                    <Image
                        loader={myLoader}
                        className="img-fluid"
                        width={1200}
                        height={700}
                        src={`${API}/blog/photo/${blog.slug}`}
                        alt={blog.title}
                    />
                </Link>
            </div>

            <h2 className={classes.Title}>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        {blog.title.toLowerCase()}
                    </a>
                </Link>
            </h2>
            <div className={classes.Meta}>
                <ul className='mark pt-3 pb-3 '>
                    <li className="d-flex align-items-center"><i className="bi bi-person"/>
                        <span className='px-2'> Written by  </span>
                        <Link href={`/profile/${blog.postedBy.username}`}>
                            <a> {blog.postedBy.username}</a>
                        </Link>
                    </li>

                    <li className="d-flex align-items-center">
                        <i className="bi bi-clock"/>
                        <span>Posted {moment(blog.updatedAt).fromNow()}</span>
                    </li>

                </ul>
            </div>

            <div className={classes.Content}>
                {!single && <>
                    {renderHTML(blog.excerpt)}
                    <div className={`${classes.ReadMore}`}>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a>Read more</a>
                        </Link>
                    </div>
                </>}
                {single && <>
                    {renderHTML(blog.body)}
                    <div className={classes.Footer}>
                        <i className="bi bi-folder"/>
                        <ul className={classes.Cats}>
                            {showCats()}
                        </ul>

                        <i className="bi bi-tags"/>
                        <ul className={classes.Tags}>
                            {showBlogTags()}
                        </ul>
                    </div>
                </>
                }
            </div>
        </article>
        // <div className="lead pb-2">
        //     <header>
        //         <Link href={`/blogs/${blog.slug}`}>
        //             <a>
        //                 <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
        //             </a>
        //         </Link>
        //     </header>
        //     <section className={classes.Section}>
        //         <p className="mark  pt-2 pb-2">
        //             Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
        //         </p>
        //     </section>
        //     <section>
        //         {showBlogCategories(blog)}
        //         {showBlogTags(blog)}
        //         <br/>
        //         <br/>
        //     </section>
        //
        //     <div className="row">
        //         <div className="col-md-4">
        //             <section className={classes.Section}>
        //                 <img
        //                     className="img img-fluid"
        //                     src={`${API}/blog/photo/${blog.slug}`}
        //                     style={{width:'100%',height:'auto'}}
        //                     alt={blog.title}
        //                 />
        //             </section>
        //         </div>
        //         <div className="col-md-8">
        //             <section className={classes.Section}>
        //                 <div className="pb-3">{renderHTML(blog.excerpt)}</div>
        //                 <Link href={`/blogs/${blog.slug}`}>
        //                     <a className="btn btn-primary pt-2">Read more</a>
        //                 </Link>
        //             </section>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Card;