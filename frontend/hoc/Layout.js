import Footer from "../components/footer/Footer";
import Toolbar from "../components/navgation/Toolbar";
import Hero from "../components/home/Hero";
import Breadcrumb from "../components/reusables/Breadcrumbs";
import useSWR from "swr";
import {API} from "../config";
import AdBanner from "../components/AdBanner";
import {fetcher} from "../axios/axios";



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
            <Toolbar pages={pages} blog={blog}/>
            {home && <Hero services={allFeatured}/>}
            <main>
                {blog && !noHero && <Hero services={footerBlogs} blog/>}
                {!noBread && <Breadcrumb imageUrl={imageUrl} pageTitle={pageTitle}/>}
                {children}
            </main>
            <AdBanner
                data-ad-slot="6511402910"
                style={{width: '100%', height: '250px'}}
            />
            <Footer
                services={footerServices}
                blogs={footerBlogs}
                blog={blog}
            />
        </>
    );
}

export default Layout;
