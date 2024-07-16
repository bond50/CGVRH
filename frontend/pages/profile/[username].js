import dynamic from "next/dynamic";
import Head from "next/head";
import { APP_NAME, DOMAIN, FB_APP_ID, API } from "../../config";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { userPublicProfile } from "../../actions/user";
import classes from '../../styles/Userprofile.module.css';
import Preloader from "../../components/preloader";

const Layout = dynamic(() => import("../../hoc/Layout"), { ssr: false, loading: () => <Preloader /> });
const ContactForm = dynamic(() => import("../../components/form/ContactForm"), { ssr: false, loading: () => <Preloader /> });

const UserProfile = ({ user, blogs, query }) => {

    const head = () => (
        <Head>
            <title>{user.username} | {APP_NAME}</title>
            <meta name="description" content={`Articles by ${user.username}`} />
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
            <meta property="og:description" content={`Articles by ${user.username}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:site_name" content={APP_NAME} />
            <meta property="og:image" content="/herp.jpg" />
            <meta property="og:image:secure_url" content="/herp.jpg" />
            <meta property="og:image:type" content="image/png" />
            <meta property="fb:app_id" content={FB_APP_ID} />
        </Head>
    );

    const showUserBlogs = () => (
        blogs.map((blog, i) => (
            <div className={`row ${classes.Row}`} key={i}>
                <div className="col-9">
                    <Link href={`/blog/${blog.slug}`}>
                        <a>{blog.title}</a>
                    </Link>
                </div>
                <div className="col-3">{user.name}</div>
            </div>
        ))
    );

    const splitMail = () => {
        const emailSplit = user.email.split("@");
        return emailSplit[1] === 'dummy.com' ? (
            <p>{user.name.toUpperCase()} cannot be contacted now</p>
        ) : (
            <ContactForm authorEmail={user.email} label={`Send a message to ${user.name}`} />
        );
    };

    const photoLink = `${API}/user/photo/${user.username}`;
    const myLoader = () => photoLink;

    return (
        <>
            {head()}
            <Layout>
                <section className={classes.Profile}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4">
                                <div className={`card ${classes.Card}`}>
                                    <Image
                                        loader={myLoader}
                                        src={photoLink}
                                        width={620}
                                        height={480}
                                        layout="responsive"
                                        className="card-img-top"
                                        alt={`${user.name}'s profile picture`}
                                    />
                                    <div className={`card-body ${classes.CardBody} d-flex flex-column align-items-center`}>
                                        <h2>{user.name}</h2>
                                        <h3>{user.designation || "Designation not available"}</h3>
                                        <div className={`${classes.Links} mt-2`}>
                                            {user.twitter && (
                                                <Link href={user.twitter}>
                                                    <a className="twitter">
                                                        <i className="bi bi-twitter" />
                                                    </a>
                                                </Link>
                                            )}
                                            {user.facebook && (
                                                <Link href={user.facebook}>
                                                    <a className="facebook">
                                                        <i className="bi bi-facebook" />
                                                    </a>
                                                </Link>
                                            )}
                                            {user.instagram && (
                                                <Link href={user.instagram}>
                                                    <a className="instagram">
                                                        <i className="bi bi-instagram" />
                                                    </a>
                                                </Link>
                                            )}
                                            {user.linkedIn && (
                                                <Link href={user.linkedIn}>
                                                    <a className="linkedin">
                                                        <i className="bi bi-linkedin" />
                                                    </a>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                {blogs.length > 0 && (
                                    <div className={`card ${classes.Card}`}>
                                        <div className={`card-body ${classes.CardBody}`}>
                                            <h5 className={classes.CardTitle}>
                                                Articles written by <em><strong>{user.username}</strong></em>
                                            </h5>
                                            {showUserBlogs()}
                                        </div>
                                    </div>
                                )}
                                {user.about && (
                                    <div className={`card ${classes.Card}`}>
                                        <div className={`card-body ${classes.CardBody}`}>
                                            <h5 className={classes.CardTitle}>About {user.name}</h5>
                                            <p>{user.about}</p>
                                        </div>
                                    </div>
                                )}
                                {splitMail()}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export const getServerSideProps = async ({ query }) => {
    const data = await userPublicProfile(query.username);

    if (data.error) {
        console.log(data.error);
        return {
            notFound: true,
        };
    } else {
        return {
            props: { blogs: data.blogs, user: data.user, query },
        };
    }
};

export default UserProfile;
