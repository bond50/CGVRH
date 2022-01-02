
import Footer from "../components/footer/Footer";
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
