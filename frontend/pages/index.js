import Strategic from "../components/home/Strategic";

import CoreValues from "../components/home/CoreValues";
import Roles from "../components/home/Roles";
import FeaturedServices from "../components/home/FeaturedServices";
import LatestBlogs from "../components/home/LatestBlogs";
import useSWR from 'swr'
import {API} from "../config";
import Toolba from "../components/navgation/Toolba";
import {Fragment, useEffect, useState} from "react";
import Hero from "../components/home/Hero";
import Footer from "../components/footer/Footer";
import {listBlogsWithCategoriesAndTags} from "../actions/blog";


export default function Home() {
    const {data: services, error: serviceError} = useSWR(`${API}/featured-services`)
    const {data: blogs, error: blogsError} = useSWR(`${API}/list-home-page-blogs`)
    if (serviceError || blogsError) return <div>failed to load</div>
    if (!blogs||!services) return <div>loading...</div>


    return (
        <Fragment>
            <Toolba/>
            <Hero data={services}/>
            <main id='main'>
                <LatestBlogs blogs={blogs}/>
                {/*<Strategic/>*/}
                {/*<FeaturedServices featured={data}/>*/}
                <CoreValues/>
                <Roles/>
            </main>
            <Footer/>
        </Fragment>

        // <HomepageLayout>
        //     <article className="overflow-hidden">
        //         <div className="container mt-4">
        //             <div className="row">
        //                 <div className="col-md-12 text-center">
        //                     <h1 className="display-4 font-weight-bold">
        //                         PROGRAMMING & WEB DEVELOPMENT BLOGS/TUTORIALS
        //                     </h1>
        //                 </div>
        //             </div>
        //         </div>
        //
        //         <div className="container">
        //             <div className="row">
        //                 <div className="col-md-12 text-center pt-4 pb-5">
        //                     <p className="lead">
        //                         Best programming and web development blogs and tutorials on React Node NextJs and
        //                         JavaScript
        //                     </p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="container-fluid">
        //             <div className="row">
        //                 <div className="col-md-4">
        //                     <div className="flip flip-horizontal">
        //                         <div
        //                             className="front"
        //                             style={{
        //                                 backgroundImage:
        //                                     'url(' +
        //                                     'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
        //                                     ')'
        //                             }}
        //                         >
        //                             <h2 className="text-shadow text-center h1">React</h2>
        //                         </div>
        //                         <div className="back text-center">
        //                             <Link href="/categories/react">
        //                                 <a>
        //                                     <h3 className="h1">React Js</h3>
        //                                 </a>
        //                             </Link>
        //                             <p className="lead">The world's most popular frontend web development library</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //
        //                 <div className="col-md-4">
        //                     <div className="flip flip-horizontal">
        //                         <div
        //                             className="front"
        //                             style={{
        //                                 backgroundImage:
        //                                     'url(' +
        //                                     'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
        //                                     ')'
        //                             }}
        //                         >
        //                             <h2 className="text-shadow text-center h1">Node</h2>
        //                         </div>
        //                         <div className="back text-center">
        //                             <Link href="/categories/node">
        //                                 <a>
        //                                     <h3 className="h1">Node Js</h3>
        //                                 </a>
        //                             </Link>
        //                             <p className="lead">
        //                                 The worlds most popular backend development tool for JavaScript Ninjas
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </div>
        //
        //                 <div className="col-md-4">
        //                     <div className="flip flip-horizontal">
        //                         <div
        //                             className="front"
        //                             style={{
        //                                 backgroundImage:
        //                                     'url(' +
        //                                     'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
        //                                     ')'
        //                             }}
        //                         >
        //                             <h2 className="text-shadow text-center h1">Next</h2>
        //                         </div>
        //                         <div className="back text-center">
        //                             <Link href="/categories/services">
        //                                 <a>
        //                                     <h3 className="h1">Pharmacy</h3>
        //                                 </a>
        //                             </Link>
        //                             <p className="lead">A Production ready web framework for building SEO React apps</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </article>
        // </HomepageLayout>
    )
}
