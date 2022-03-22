import Link from 'next/link';
import React, {Fragment} from "react";
import renderHTML from 'react-render-html';
import moment from 'moment';
import {API} from '../../config';
import classes from '../../styles/BlogCard.module.css'
import Image from "next/image";


const Card = ({blog, single, servicePage}) => {


    let attachedClass = classes.Entry

    if (servicePage) {
        attachedClass = classes.ServiceEntry
    }


    const showBlogTags = () =>
        blog.tags.map((t, i) => {
            let tagsLink = `/tags/${t.slug}`
            if (servicePage) {
                tagsLink = `/service-tags/${t.slug}`
            }
            return (
                <li key={i}>
                    <Link href={tagsLink}>
                        <a> {t.name}</a>
                    </Link>
                </li>

            );
        });

    function showCats() {
        return blog.categories.map((c, i) => {

            let catsLink = `/categories/${c.slug}`
            if (servicePage) {
                catsLink = `/service-categories/${c.slug}`
            }

            return (
                <li key={i}>
                    <Link href={catsLink}>
                        <a>{c.name}</a>
                    </Link>
                </li>

            );
        })
    }

    let imgSrc = `${API}/blog/photo/${blog.slug}`
    if (servicePage) {
        imgSrc = `${API}/blog/photo/${blog.slug}`

    }


    return (
        <article className={attachedClass}>
            <Fragment>
                <div className={classes.Image}>
                    <Image
                        className="img-fluid"
                        width={1200}
                        height={700}
                        src={imgSrc}
                        alt={blog.title}

                    />

                </div>
                <h2 className={classes.Title}>
                    <Link href={single ? '' : `/blogs/${blog.slug}`}>
                        <a>
                            {blog.title.toLowerCase()}
                        </a>
                    </Link>

                </h2>
            </Fragment>


            {!servicePage && <div className={classes.Meta}>
                <ul className='mark pt-3 pb-3 '>
                    <li className="d-flex align-items-center"><i className="bi bi-person"/>
                        <span className='px-2'> Written by  </span>
                        <Link href={`/profile/${blog.postedBy.username}`}>
                            <a> {blog.postedBy.username}</a>
                        </Link>
                    </li>

                    <li className="d-flex align-items-center">
                        <i className="bi bi-calendar"/>
                        <span> {moment(blog.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    </li>

                </ul>
            </div>
            }

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
                    {!servicePage && <div className={classes.Footer}>
                        <i className="bi bi-folder"/>
                        <ul className={classes.Cats}>
                            {showCats()}
                        </ul>

                        <i className="bi bi-tags"/>
                        <ul className={classes.Tags}>
                            {showBlogTags()}
                        </ul>
                    </div>}
                </>
                }
            </div>
        </article>

    );
};

export default Card;
