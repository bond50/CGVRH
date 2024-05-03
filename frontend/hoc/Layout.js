import Footer from "../components/footer/Footer";
import Toolbar from "../components/navgation/Toolbar";
import Hero from "../components/home/Hero";
import Breadcrumb from "../components/reusables/Breadcrumbs";
import {useEffect, useState} from "react";
import axios from "axios";
import {API} from "../config";


const Layout = ({
                    children,
                    pages,
                    imageUrl,
                    pageTitle,
                    noBread,
                    home,
                    featuredServices,
                    featuredBlogs,
                    allFeatured
                }) => {
    const [footerServices, setFooterServices] = useState(featuredServices);
    const [footerBlogs, setFooterBlogs] = useState(featuredBlogs);

    useEffect(() => {
            if (!featuredServices || !featuredBlogs) {
                const fetchServices = axios.get(`${API}/featured-general`);
                const fetchBlogs = axios.get(`${API}/featured-blogs`);
                Promise.all([fetchServices, fetchBlogs]).then(([servicesResponse, blogsResponse]) => {
                    setFooterServices(servicesResponse.data);
                    setFooterBlogs(blogsResponse.data);
                });
            }
        }, []
    );

    return (
        <>
            <Toolbar pages={pages}/>
            {home && <Hero services={allFeatured}/>}
            <main>
                {!noBread && <Breadcrumb imageUrl={imageUrl} pageTitle={pageTitle}/>}

                {children}
            </main>
            <Footer
                services={footerServices}
                blogs={footerBlogs}/>
        </>
    );


}


export default Layout
