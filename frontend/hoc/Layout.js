
import Footer from "../components/footer/Footer";

import Top from "../components/navgation/Top";
import Breadcrumbs from "../components/reusables/Breadcrumbs";
import Toolbar from "../components/navgation/Toolbar";


const Layout = ({children}) => {
    return (
        <>
           <Toolbar/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );


}


export default Layout
