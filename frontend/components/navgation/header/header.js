import Logo from "../Logo";
import React, {useEffect, useState} from "react";
import Nav from "../Nav";

const Header = ({pages,blog}) => {
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 30) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    let navbarClasses = ['d-flex', 'align-items-center'];

    if (scrolled) {
        navbarClasses.push('fixed-top');
    }
    if (blog){
        navbarClasses.push('blog-header')
    }

    return (
        <header id="header" className={navbarClasses.join(' ')}>
            <div className="container d-flex align-items-center justify-content-between">
                <Logo scrolled={scrolled}/>
                <Nav pages={pages} blog={blog}/>

            </div>
        </header>
    );
};

export default Header;