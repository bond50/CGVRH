import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import {API} from '../../config';
import classes from '../../styles/SmallCard.module.css'
import Image from "next/image";
import React from "react";

const SmallCard = ({blog}) => {

    const returnCard = () => {
        const myLoader = ({src}) => {
            return `${API}/blog/photo/${blog.slug}`;
        }
        return <div className={`card ${classes.Card}`}>
            <Link href={`/blogs/${blog.slug}`}>
                <a>
                    {/*<img*/}
                    {/*    className="img img-fluid"*/}
                    {/*    */}
                    {/*    style={{maxHeight: 'auto', width: '100%'}}*/}
                    {/*    src={`${API}/blog/photo/${blog.slug}`}*/}
                    {/*    alt={blog.title}*/}
                    {/*/>*/}

                    <Image
                        loader={myLoader}
                        style={{maxHeight: 'auto', width: '100%'}}
                        className="img-fluid"
                        width={370}
                        height={250}
                        src={`${API}/blog/photo/${blog.slug}`}
                        alt={blog.title}
                    />
                </a>
            </Link>
            <div className="card-body">
                <h5 className="card-title">
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>
                            {blog.title.toLowerCase()}
                        </a>
                    </Link>
                </h5>
                <div className="card-text">{renderHTML(blog.excerpt)}</div>
                <div className={classes.Info}>
                    Posted {moment(blog.updatedAt).fromNow()} by{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a className="float-end">{blog.postedBy.username}</a>
                    </Link>
                </div>

            </div>
        </div>;
    };

    return (returnCard()
        // <div className="card">
        //     <section style={{padding: '0'}}>
        //         <Link href={`/blogs/${blog.slug}`}>
        //             <a>
        //                 <img
        //                     className="img img-fluid"
        //                     style={{maxHeight: 'auto', width: '100%'}}
        //                     src={`${API}/blog/photo/${blog.slug}`}
        //                     alt={blog.title}
        //                 />
        //             </a>
        //         </Link>
        //     </section>
        //
        //     <div className="card-body">
        //         <section style={{padding: '0'}}>
        //             <Link href={`/blogs/${blog.slug}`}>
        //                 <a>
        //                     <h5 className="card-title">{blog.title}</h5>
        //                 </a>
        //             </Link>
        //             <p className="card-text">{renderHTML(blog.excerpt)}</p>
        //         </section>
        //     </div>
        //
        //     <div className="card-body">
        //         Posted {moment(blog.updatedAt).fromNow()} by{' '}
        //         <Link href={`/`}>
        //             <a className="float-end">{blog.postedBy.name}</a>
        //         </Link>
        //     </div>
        // </div>

    );
};

export default SmallCard;