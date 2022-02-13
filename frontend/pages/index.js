import Strategic from "../components/home/Strategic";
import Roles from "../components/home/Roles";
import FeaturedServices from "../components/home/FeaturedServices";
import LatestBlogs from "../components/home/LatestBlogs";
import useSWR from 'swr'
import {API} from "../config";
import Toolbar from "../components/navgation/Toolbar";
import {Fragment} from "react";
import Hero from "../components/home/Hero";
import Footer from "../components/footer/Footer";
import CoreValues from "../components/home/CoreValues";


export default function Home() {

    const {data: services, error: serviceError} = useSWR(`${API}/featured-general`)
    const {data: blogs, error: blogsError} = useSWR(`${API}/list-recent-blogs`)
    if (blogsError) return <div className='container uh-oh mt-5 pt-5 '><p>uh oh something is
        wrong..Please
        contact Vihiga county referral hospital ICT team for assistance.Thank you </p></div>
    if (!blogs) return <div className='preloader'/>

    // let comp = <Hero data={services}/>
    // if (!services || services.length <= 0) {
    //     comp = null
    // }


    return (
        <Fragment>
            <Toolbar/>
            {!services || services.length <= 0 ? null : <Hero data={services}/>}
            <main id='main'>
                <Strategic/>
                {!blogs || blogs.length <= 0 ? null : <LatestBlogs blogs={blogs}/>}

                {!services || services.length <= 0 ? null : <FeaturedServices featured={services}/>}
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
        //                cd  <div className="col-md-12 text-center pt-4 pb-5">
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
