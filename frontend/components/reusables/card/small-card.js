import Link from 'next/link';
import {API} from '../../../config';
import classes from '../../../styles/SmallCard.module.css';
import Image from "next/image";
import React, {useState, useEffect} from "react";
import {stripAllTags} from "../utility";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

const SmallCard = ({blog, service, isPriority}) => {
    const [photoLink, setPhotoLink] = useState('');
    const [multiLink, setMultiLink] = useState('');

    useEffect(() => {
        let initialPhotoLink;
        let initialMultiLink;

        if (service) {
            initialPhotoLink = `${API}/service/photo/${service.slug}`;
            initialMultiLink = `/services/${service.slug}`;
        } else if (blog) {
            initialMultiLink = `/blog/${blog.slug}`;
            if (blog.images && blog.images.length > 0) {
                const image = blog.images[0]; // Ensure consistent image selection
                initialPhotoLink = image.url;
            } else {
                initialPhotoLink = `${API}/blog/photo/${blog.slug}`;
            }
        } else {
            initialPhotoLink = '';
            initialMultiLink = '';
        }

        const cloudinaryUrlTransform = (url) => {
            return url.replace('/upload/', '/upload/f_auto,q_auto/');
        };

        if (initialPhotoLink) {
            initialPhotoLink = cloudinaryUrlTransform(initialPhotoLink);
        }

        setPhotoLink(initialPhotoLink);
        setMultiLink(initialMultiLink);
    }, [blog, service]);

    if (!photoLink) {
        return null; // Don't render the component until the photoLink is set
    }

    return (
        <div className={`card ${classes.Card}`}>
            <Link href={multiLink}>
                <a>
                    <Image
                        layout="responsive"
                        width={720}
                        height={450}
                        src={photoLink}
                        alt={blog ? blog.title : service.title}
                        priority={isPriority} // Preload the first image
                        loading={isPriority ? undefined : "lazy"} // Lazy load other images
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
                <div className="card-text">
                    <p>{blog ? stripAllTags(blog.excerpt, []) : stripAllTags(service.excerpt, [])}</p>
                </div>
                {blog && (
                    <div className={classes.Info}>
                        Posted {dayjs(blog.createdAt).fromNow()} by{' '}
                        <Link href={`/profile/${blog.postedBy.username}`}>
                            <a className="float-end">{blog.postedBy.username}</a>
                        </Link>
                    </div>
                )}
            </div>

        </div>
    );
};

export default SmallCard;
