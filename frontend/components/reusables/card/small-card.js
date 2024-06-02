import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import {API} from '../../../config';
import classes from '../../../styles/SmallCard.module.css'
import Image from "next/image";
import React from "react";

const SmallCard = ({blog, service}) => {

    console.log(blog)


    let photoLink
    let multiLink

    if (service) {
        photoLink = `${API}/service/photo/${service.slug}`
        multiLink = `/services/${service.slug}`
    } else if (blog) {
        multiLink = `/blogs/${blog.slug}`
        if (blog.images && blog.images.length && blog.images.length > 0) {
            const image = blog.images[Math.floor(Math.random() * blog.images.length)];
            photoLink = image.url
        } else {
            photoLink = `${API}/blog/photo/${blog.slug}`
        }


    } else {
        photoLink = ''
        multiLink = ''
    }


    const returnCard = () => {
        const myLoader = () => {
            return photoLink;
        }

        return <div className={`card ${classes.Card}`}>
            <Link href={multiLink}>
                <a>
                    <Image
                        loader={myLoader}
                        style={{maxHeight: 'auto', width: '100%'}}
                        className="img-fluid"
                        width={720}
                        height={450}
                        src={photoLink}
                        priority={true}
                        alt={blog ? blog.title : service.title}
                    />
                </a>
            </Link>
            <div className="card-body">
                <h5 className="card-title">
                    <Link href={multiLink}>
                        <a>
                            {blog ? blog.title.toLowerCase() : service.title.toLowerCase()}
                        </a>
                    </Link>
                </h5>

                <div className="card-text">{blog ? renderHTML(blog.excerpt) : renderHTML(service.excerpt)}</div>
                {blog && <div className={classes.Info}>
                    Posted {moment(blog.createdAt).fromNow()} by{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a className="float-end">{blog.postedBy.username}</a>
                    </Link>
                </div>
                }
            </div>
        </div>;
    };

    return (returnCard());
};

export default SmallCard;