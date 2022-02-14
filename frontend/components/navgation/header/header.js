import Logo from "../Logo";
import {useEffect, useState} from "react";


import Nav from "../Nav";
import BlogNav from "../blog-nav";

const Header = ({blog}) => {
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    let navbarClasses = [`d-flex align-items-center`];

    if (scrolled) {
        navbarClasses.push('fixed-top');

    }

    let nav = <Nav/>
    if (blog) {
        nav = <BlogNav/>
    }

    return (
        <header id="header" className={navbarClasses.join(" ")}>
            <div className="container d-flex align-items-center justify-content-between">
                <Logo scrolled={scrolled}/>
                {nav}
            </div>
        </header>
    );
};

export default Header;