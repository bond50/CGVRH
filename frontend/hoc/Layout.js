import Footer from "../components/footer/Footer";
import Index from "../components/navgation/toolbar";
import Hero from "../components/home/Hero";
import Breadcrumb from "../components/reusables/Breadcrumbs";
import useSWR from "swr";
import {API} from "../config";
import AdBanner from "../components/adsense/AdBanner";
import {fetcher} from "../axios/axios";
import React from "react";


const Layout = ({
                    children,
                    pages,
                    imageUrl,
                    pageTitle,
                    noBread,
                    home,
                    noHero,
                    blog,
                    featuredServices,
                    featuredBlogs,
                    allFeatured
                }) => {
    const {
        data: fetchedServices,
        error: servicesError
    } = useSWR(!featuredServices ? `${API}/featured-general` : null, fetcher);
    const {data: fetchedBlogs, error: blogsError} = useSWR(!featuredBlogs ? `${API}/featured-blogs` : null, fetcher);

    const footerServices = featuredServices || fetchedServices || [];
    const footerBlogs = featuredBlogs || fetchedBlogs || [];

    if (servicesError || blogsError) {
        console.error('Error fetching footer data:', servicesError || blogsError);
    }

    return (
        <>
            <Index pages={pages} blog={blog}/>
            {home && <Hero services={allFeatured}/>}
            <main>
                {blog && !noHero && <Hero services={footerBlogs} blog/>}
                {!noBread && <Breadcrumb imageUrl={imageUrl} pageTitle={pageTitle}/>}
                {children}
                <AdBanner/>
            </main>

            <Footer
                services={footerServices}
                blogs={footerBlogs}
                blog={blog}
            />
        </>
    );
}

export default Layout;
