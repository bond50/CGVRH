import Logo from "../Logo";
import {useEffect, useState} from "react";
import classes from '../../../styles/Header.module.css'

import Nav from "../Nav";

const Header = () => {
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

    let navbarClasses = [`d-flex align-items-center justify-content-between ${classes.Header}`];

    if (scrolled) {
        navbarClasses.push(classes.Fixed);

    }

    return (
        <header className={navbarClasses.join(" ")}>
            <div className="container d-flex align-items-center justify-content-between">
                <Logo scrolled={scrolled}/>
                <Nav/>
            </div>
        </header>
    );
};

export default Header;