
import Footer from "../components/footer/Footer";

import Top from "../components/navgation/Top";
import Breadcrumbs from "../components/reusables/Breadcrumbs";
import Toolbar from "../components/navgation/Toolbar";


const Layout = ({children,home}) => {
    return (
        <>
           <Toolbar home={home}/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );


}


export default Layout
