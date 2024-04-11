import Footer from "../components/footer/Footer";
import Toolbar from "../components/navgation/Toolbar";
import Hero from "../components/home/Hero";
import Breadcrumb from "../components/reusables/Breadcrumbs";
import useSWR from "swr";
import {API} from "../config";


const Layout = ({children, pages, imageUrl, pageTitle, home}) => {
    const {data: services, error} = useSWR(`${API}/featured-general`)
    const {data: blogs, error: blogErr} = useSWR(`${API}/featured-blogs`)
    const list = [

        {title: 'County website', link: 'https://vihiga.go.ke/'},
        {title: 'Health Management team', link: '/about-us/board-members'},
        {title: 'MOH', link: 'https://www.health.go.ke/'},
    ]
    if (error || blogErr) {
        return ''
    }

    return (
        <>
            <Toolbar pages={pages}/>
            {home && <Hero/>}
            <main>
                {!home && <Breadcrumb imageUrl={imageUrl} pageTitle={pageTitle}/>}
                {children}
            </main>
            <Footer disabled={list} services={services} blogs={blogs}/>
        </>
    );


}


export default Layout
