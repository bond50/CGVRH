import Layout from "../../hoc/Layout";
import {listBlogsWithCategoriesAndTags, listRelated, singleBlog} from "../../actions/blog";
import {API, APP_NAME, DOMAIN, FB_APP_ID} from "../../config";
import Link from "next/link";
import moment from "moment";
import classes from '../../styles/SingleBlog.module.css'
import renderHTML from "react-render-html";
import Head from "next/head";
import React, {useState, useEffect} from "react";
import SmallCard from "../../components/blog/SmallCard";
import BlogContainer from "../../hoc/BlogContainer";
import BlogSideBarContent from "../../components/blog/BlogSideBarContent";
import Card from "../../components/blog/Card";

const Slug = ({blog, query}) => {


    const [related, setRelated] = useState([])
    const loadRelated = () => {
        listRelated({blog}).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setRelated(data)
            }
        })

    };

    useEffect(() => {
        loadRelated()
    }, [])

    const head = () => (
        <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc}/>
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`}/>
            <meta property="og:title" content={`${blog.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={blog.mdesc}/>
            <meta property="og:type" content="webiste"/>
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`}/>
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    );

    const showBlog = () => {
        return <article className={classes.Entry} >
            <Card blog={blog} single/>
        </article>
    };

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mx-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mx-1 mt-3">{t.name}</a>
            </Link>
        ));

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog}/>
                </article>
            </div>
        ));
    };

    return (
        <>
            {head()}
            <Layout>
                <main>
                    <article>
                        <BlogContainer>
                            {showBlog()}
                            <article className="entry entry-single">


                                <div className="entry-content">
                                    <p>
                                        Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi
                                        praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
                                        Et eveniet enim. Qui velit est ea dolorem doloremque deleniti aperiam unde
                                        soluta. Est cum et quod quos aut ut et sit sunt. Voluptate porro consequatur
                                        assumenda perferendis dolore.
                                    </p>

                                    <p>
                                        Sit repellat hic cupiditate hic ut nemo. Quis nihil sunt non reiciendis. Sequi
                                        in accusamus harum vel aspernatur. Excepturi numquam nihil cumque odio. Et
                                        voluptate cupiditate.
                                    </p>

                                    <blockquote>
                                        <p>
                                            Et vero doloremque tempore voluptatem ratione vel aut. Deleniti sunt animi
                                            aut. Aut eos aliquam doloribus minus autem quos.
                                        </p>
                                    </blockquote>

                                    <p>
                                        Sed quo laboriosam qui architecto. Occaecati repellendus omnis dicta inventore
                                        tempore provident voluptas mollitia aliquid. Id repellendus quia. Asperiores
                                        nihil magni dicta est suscipit perspiciatis. Voluptate ex rerum assumenda
                                        dolores nihil quaerat.
                                        Dolor porro tempora et quibusdam voluptas. Beatae aut at ad qui tempore corrupti
                                        velit quisquam rerum. Omnis dolorum exercitationem harum qui qui blanditiis
                                        neque.
                                        Iusto autem itaque. Repudiandae hic quae aspernatur ea neque qui. Architecto
                                        voluptatem magni. Vel magnam quod et tempora deleniti error rerum nihil tempora.
                                    </p>

                                    <h3>Et quae iure vel ut odit alias.</h3>
                                    <p>
                                        Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit
                                        ut rerum atque. Optio provident dolores atque voluptatem rem excepturi molestiae
                                        qui. Voluptatem laborum omnis ullam quibusdam perspiciatis nulla nostrum.
                                        Voluptatum est libero eum nesciunt aliquid qui.
                                        Quia et suscipit non sequi. Maxime sed odit. Beatae nesciunt nesciunt accusamus
                                        quia aut ratione aspernatur dolor. Sint harum eveniet dicta exercitationem
                                        minima. Exercitationem omnis asperiores natus aperiam dolor consequatur id ex
                                        sed. Quibusdam rerum dolores sint consequatur quidem ea.
                                        Beatae minima sunt libero soluta sapiente in rem assumenda. Et qui odit
                                        voluptatem. Cum quibusdam voluptatem voluptatem accusamus mollitia aut atque
                                        aut.
                                    </p>
                                    <img src="assets/img/blog/blog-inside-post.jpg" className="img-fluid" alt=""/>

                                    <h3>Ut repellat blanditiis est dolore sunt dolorum quae.</h3>
                                    <p>
                                        Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro amet
                                        nostrum. In assumenda quia quae a id praesentium. Quos deleniti libero sed
                                        occaecati aut porro autem. Consectetur sed excepturi sint non placeat quia
                                        repellat incidunt labore. Autem facilis hic dolorum dolores vel.
                                        Consectetur quasi id et optio praesentium aut asperiores eaque aut.
                                        Explicabo omnis quibusdam esse. Ex libero illum iusto totam et ut aut
                                        blanditiis. Veritatis numquam ut illum ut a quam vitae.
                                    </p>
                                    <p>
                                        Alias quia non aliquid. Eos et ea velit. Voluptatem maxime enim omnis ipsa
                                        voluptas incidunt. Nulla sit eaque mollitia nisi asperiores est veniam.
                                    </p>

                                </div>

                                <div className="entry-footer">
                                    <i className="bi bi-folder"></i>
                                    <ul className="cats">
                                        <li><a href="#">Business</a></li>
                                    </ul>

                                    <i className="bi bi-tags"></i>
                                    <ul className="tags">
                                        <li><a href="#">Creative</a></li>
                                        <li><a href="#">Tips</a></li>
                                        <li><a href="#">Marketing</a></li>
                                    </ul>
                                </div>

                            </article>

                        </BlogContainer>
                        {/*<div>*/}
                        {/*    <section className={classes.Section}>*/}
                        {/*        <div className="row" style={{marginTop: '-30px'}}>*/}
                        {/*            <img*/}
                        {/*                src={`${API}/blog/photo/${blog.slug}`}*/}
                        {/*                alt={blog.title}*/}
                        {/*                className="img img-fluid featured-image"*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </section>*/}

                        {/*    <section className={classes.Section}>*/}
                        {/*        <p className="lead mt-3 mark">*/}
                        {/*            Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}*/}
                        {/*        </p>*/}
                        {/*        <BlogSideBarContent/>*/}
                        {/*        <div className="pb-3">*/}
                        {/*            {showBlogCategories(blog)}*/}
                        {/*            {showBlogTags(blog)}*/}
                        {/*            <br/>*/}
                        {/*            <br/>*/}
                        {/*        </div>*/}
                        {/*    </section>*/}
                        {/*</div>*/}

                        {/*<div className="container">*/}
                        {/*    <h1 className="display-2 pb-3 pt-3 text-center ">{` ${blog.title}`}</h1>*/}
                        {/*    <section className={classes.Section}>*/}
                        {/*        <div className="col-md-12 lead">{renderHTML(blog.body)}</div>*/}
                        {/*    </section>*/}
                        {/*</div>*/}

                        {/*<div className="container">*/}
                        {/*    <h4 className="text-center pt-2 pb-2 h2">Related blogs</h4>*/}
                        {/*    <div className="row">{showRelatedBlog()}</div>*/}
                        {/*</div>*/}

                        {/*<div className="container pb-5">*/}
                        {/*    <p>show comments</p>*/}
                        {/*</div>*/}
                    </article>
                </main>
            </Layout>
        </>
    );
};


export const getServerSideProps = async ({query}) => {

    return singleBlog(query.slug).then(data => {

        if (data.error) {
            console.log(data.error)
        } else {
            return {
                props: {blog: data, query}

            }
        }
    })
}
export default Slug