
import Footer from "../components/footer/Footer";

import Top from "../components/navgation/Top";
import Breadcrumbs from "../components/reusables/Breadcrumbs";
import Toolba from "../components/navgation/Toolba";


const Layout = ({children}) => {
    return (
        <>
           <Toolba/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );


}


export default Layout
