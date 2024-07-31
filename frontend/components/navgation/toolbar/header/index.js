import React, { useEffect, useState } from "react";
import Logo from "../../Logo";
import Navbar from "./navbar";
import styles from '../../../../styles/Header.module.css';

const Header = ({ pages, blog }) => {
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

    let headerClasses = [styles.Header];
    if (scrolled) {
        headerClasses.push(styles['fixed-top']);
    }
    if (blog) {
        headerClasses.push(styles.BlogHeader);
    }

    return (
        <header className={headerClasses.join(' ')}>
            <div className="container d-flex align-items-center justify-content-between">
                <Logo scrolled={scrolled} />
                <Navbar pages={pages} blog={blog} />
            </div>
        </header>
    );
};

export default Header;
