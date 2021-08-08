import Logo from "./Logo";
import {useEffect, useState} from "react";

import Nav from "./Nav";

const Header = () => {

    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 70) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    let navbarClasses = [` d-flex align-items-center`];

    if (scrolled) {
        navbarClasses.push(`fixed-top`);
    }


    return (
        <header className={navbarClasses.join(" ")} id='header'>
            <div className="container d-flex align-items-center justify-content-between">
                <Logo/>
                <Nav/>
            </div>
        </header>
    );
};

export default Header;