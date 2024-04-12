import Footer from "../components/footer/Footer";
import Toolbar from "../components/navgation/Toolbar";
import Hero from "../components/home/Hero";
import Breadcrumb from "../components/reusables/Breadcrumbs";
import useSWR from "swr";
import {API} from "../config";


const Layout = ({children, pages, imageUrl, pageTitle, home,featuredServices,featuredBlogs,allFeatured}) => {


    return (
        <>
            <Toolbar pages={pages}/>
            {home && <Hero services={allFeatured}/>}
            <main>
                {!home && <Breadcrumb imageUrl={imageUrl} pageTitle={pageTitle}/>}
                {children}
            </main>
            <Footer
                services={featuredServices}
                blogs={featuredBlogs}/>
        </>
    );


}


export default Layout
