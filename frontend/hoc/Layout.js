import Toolbar from "../components/navgation/Toolbar/Toolbar";
import Footer from "../components/footer/Footer";

import Top from "../components/navgation/Toolbar/Navigationitems/Top";
import Breadcrumbs from "../components/reusables/Breadcrumbs";


const Layout = ({children}) => {
    return (
        <>
            <Top/>
            <Toolbar/>
            <main>
                <Breadcrumbs/>
                {children}
            </main>
            <Footer/>
        </>
    );


}


export default Layout
