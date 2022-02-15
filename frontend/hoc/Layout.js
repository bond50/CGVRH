import Footer from "../components/footer/Footer";
import Toolbar from "../components/navgation/Toolbar";


const Layout = ({children, home, blog}) => {
    return (
        <>
            <Toolbar home={home} blog={blog}/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );


}


export default Layout
