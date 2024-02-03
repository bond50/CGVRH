import Footer from "../components/footer/Footer";
import Toolbar from "../components/navgation/Toolbar";
// import Hero from "../components/home/Hero";
import Breadcrumb from "../components/reusables/Breadcrumbs";


const Layout = ({children, pages,imageUrl, pageTitle, home}) => {
    return (
        <>
            <Toolbar pages={pages}/>
            {/*{home && <Hero/>}*/}
            <main>
                {!home && <Breadcrumb imageUrl={imageUrl} pageTitle={pageTitle} />}
                {children}
            </main>
            <Footer/>
        </>
    );


}


export default Layout
