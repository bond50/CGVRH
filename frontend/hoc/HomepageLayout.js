import {Fragment} from "react";
import Toolbar from "../components/navgation/Toolbar/Toolbar";
import Footer from "../components/footer/Footer";
import Top from "../components/navgation/Toolbar/Navigationitems/Top";
import Hero from "../components/home/Hero";

const Layout = ({children}) => (
    <>
        <Top/>
        <Toolbar/>
        <Fragment>
            <Hero/>
            <main id='main'>
                {children}
            </main>
        </Fragment>
        <Footer/>
    </>
);


export default Layout
