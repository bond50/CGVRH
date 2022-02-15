import {userPublicProfile} from "../../actions/user";
import Layout from "../../hoc/Layout";
import Link from "next/link";
import classes from '../../styles/Userprofile.module.css'
import Head from "next/head";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import ContactForm from "../../components/form/ContactForm";
import Image from "next/image";
import React from "react";


const Userprofile = ({user, blogs, query}) => {

    const head = () => (
        <Head>
            <title>
                {user.username} | {APP_NAME}
            </title>
            <meta name="description" content={`Blogs by ${user.username}`}/>
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`}/>
            <meta property="og:title" content={`${user.username}| ${APP_NAME}`}/>
            <meta property="og:description" content={`Blogs by ${user.username}`}/>
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image"
                  content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}/>
            <meta property="og:image:secure_url"
                  content={`https://res.cloudinary.com/dwtcilinl/image/upload/v1622297993/Gallery/yffhwkqackates3w0hte.png`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>

        </Head>
    );


    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div className={`row ${classes.Row}`} key={i}>
                    <div className="col-lg-3 col-md-4 ">
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="lead">{blog.title}</a>
                        </Link>
                    </div>
                    <div className="col-lg-9 col-md-8">{user.name}</div>
                </div>

            );
        });
    };
    return (
        <>
            {head()}
            <Layout>
                <section className={classes.Profile}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 ">

                                <div className={`card ${classes.Card} `}>
                                    <Image
                                        src={`${API}/user/photo/${user.username}`}
                                        width={6720}
                                        height={4480}
                                        layout="responsive"
                                        className="card-img-top" alt="..."/>
                                    <div
                                        className={`card-body ${classes.CardBody}  d-flex flex-column align-items-center`}>
                                        <h2>{user.name}</h2>
                                        <h3>{user.designation ? user.designation : "Designation not available"}</h3>


                                        <div className={`${classes.Links} mt-2`}>
                                            {user.twitter &&
                                            <Link href={user.twitter}>
                                                <a className="twitter"><i className="bi bi-twitter"/></a>
                                            </Link>
                                            }
                                            {
                                                user.facebook &&
                                                <Link href={user.facebook}>
                                                    <a className="facebook"><i className="bi bi-facebook"/></a>
                                                </Link>

                                            }
                                            {
                                                user.instagram &&
                                                <Link href={user.instagram}>
                                                    <a className="instagram"><i
                                                        className="bi bi-instagram"/>
                                                    </a>
                                                </Link>
                                            }
                                            {user.linkedIn &&
                                            <Link href={user.linkedIn}>
                                                <a className="linkedin"><i className="bi bi-linkedin"/></a>
                                            </Link>

                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                {blogs.length <= 0 ? <p>{user.name} has not written anything</p> :
                                    <div className={`card ${classes.Card}`}>
                                        <div className={`card-body ${classes.CardBody}`}>
                                            <h5 className={classes.CardTitle}>Articles written
                                                by <em><strong>{user.name}</strong></em></h5>
                                            {showUserBlogs()}
                                        </div>
                                    </div>}

                                {user.about && <div className={`card ${classes.Card}`}>
                                    <div className={`card-body ${classes.CardBody}`}>
                                        <h5 className={classes.CardTitle}>About {user.name}</h5>
                                        <p>{user.about}</p>
                                    </div>
                                </div>}

                                {user.email && <ContactForm
                                    authorEmail={user.email}
                                    label={`Send a message to ${user.name}`}/>}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
        ;
};
export const getServerSideProps = (
    {
        query
    }
) => {

    return userPublicProfile(query.username).then(data => {

        if (data.error) {
            console.log(data.error)
        } else {
            return {
                props: {blogs: data.blogs, user: data.user, query}
            }
        }
    })
}

export default Userprofile;