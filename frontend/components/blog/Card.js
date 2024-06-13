import Link from 'next/link';
import React, {Fragment} from "react";
import {API} from '../../config';
import classes from '../../styles/BlogCard.module.css'
import Image from "next/image";
import {stripAllTags, stripTags} from "../reusables/utility";
import {incrementLikes, incrementComments, incrementShares} from "../../actions/blog"; // Import actions
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const Card = ({blog, single, blogUploadSrc, removeImageByAdmin, blogUploadTitle, admin}) => {
    console.log('CARD', blog)

    const handleLike = () => {
        incrementLikes(blog.slug).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log('Liked');
            }
        });
    };

    const handleShare = () => {
        incrementShares(blog.slug).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log('Shared');
            }
        });
    };


    const showBlogTags = () =>
        blog.tags.map((t, i) => {
            let tagsLink = `/tags/${t.slug}`
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

            return (
                <li key={i}>
                    <Link href={catsLink}>
                        <a>{c.name}</a>
                    </Link>
                </li>

            );
        })
    }


    let imgSrc = ''

    if (blog && blog.images && blog.images.length && blog.images.length > 0) {
        const image = blog.images[0];
        imgSrc = image.url
    } else {
        imgSrc = !admin && blog && `${API}/blog/photo/${blog.slug}`
    }
    const myLoader = () => {
        return imgSrc;
    }
    const adminLoader = () => {
        return blogUploadSrc
    }

    console.log(imgSrc)
    return (
        <article className={classes.Entry}>
            {
                admin ? <div className={classes.Content}>

                    <div className='position-relative d-inline'>
                        <span className={`${classes.Badge} bi bi-x`} onClick={removeImageByAdmin}></span>
                        <div className={classes.Image} style={{marginBottom: "-30px"}}>
                            <Image
                                loader={adminLoader}
                                className="img-fluid "
                                width={1200}
                                height={800}
                                src={blogUploadSrc}
                                alt={blogUploadTitle}
                            />
                        </div>

                    </div>


                </div> : <>
                    <Fragment>
                        <div className={classes.Image}>
                            <Image
                                loader={myLoader}
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


                    <div className={classes.Meta}>
                        <ul className='pt-3 pb-3 '>
                            <li className="d-flex align-items-center"><i className="bi bi-person"/>
                                <span className='px-2'> Written by  </span>
                                <Link href={`/profile/${blog.postedBy.username}`}>
                                    <a> {blog.postedBy.username}</a>
                                </Link>
                            </li>

                            <li className="d-flex align-items-center">
                                <i className="bi bi-calendar"/>
                                <span>{dayjs(blog.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</span>
                            </li>

                        </ul>
                    </div>


                    <div className={classes.Content}>
                        {!single && <>
                            {stripAllTags(blog.excerpt, [])}
                            <div className={`${classes.ReadMore}`}>
                                <Link href={`/blogs/${blog.slug}`}>
                                    <a>Read more</a>
                                </Link>
                            </div>
                        </>}
                        {single && <>
                            {stripTags(blog.body, ['strong', 'b'])}
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
                    <div className={classes.Actions}>
                        <button onClick={handleLike} className="btn btn-primary">Like</button>
                        <button onClick={handleShare} className="btn btn-secondary">Share</button>
                        {/* Comment functionality to be integrated with existing comment system */}
                    </div>
                </>
            }

        </article>

    );
};

export default Card;
