import {Fragment} from "react";
import Footer from "../components/footer/Footer";
import Hero from "../components/home/Hero";
import Toolba from "../components/navgation/Toolba";

const Layout = ({children}) => (
    <>
       <Toolba/>
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
