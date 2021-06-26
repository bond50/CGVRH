import {userPublicProfile} from "../../actions/user";
import Layout from "../../hoc/Layout";
import Link from "next/link";
import moment from "moment";
import classes from '../../styles/Userprofile.module.css'
import Head from "next/head";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import ContactForm from "../../components/form/ContactForm";

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
                <div className={classes.User} key={i}>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="lead">{blog.title.toLowerCase()}</a>
                    </Link>
                </div>
            );
        });
    };
    return (
        <>{head()}
            <Layout>
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className='row'>
                                        <div className="col-md-8">
                                            <h5>{user.name.toUpperCase()}</h5>
                                            <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <img
                                                src={`${API}/user/photo/${user.username}`}
                                                className="img-fluid img-thumbnail mb-3"
                                                style={{maxHeight: '100px', maxWidth: '100%'}}
                                                alt="user profile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br/>

                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary p-4 text-white">
                                        Recent blogs by {user.name}
                                    </h5>
                                    {showUserBlogs()}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h5 className=" bg-primary p-4 text-light">
                                Message {user.name}
                            </h5>


                            <ContactForm authorEmail={user.email}/>

                        </div>
                    </div>
                </div>
            </Layout></>
    );
};
export const getServerSideProps = ({query}) => {

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