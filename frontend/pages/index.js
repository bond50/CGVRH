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

    )
}
