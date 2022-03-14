import Logo from "../Logo";
import React, {Fragment, useEffect, useState} from "react";
import BlogNav from "../blog-nav";
import Nav from "../Nav";
import Image from "next/image";
import Link from "next/link";

const Header = ({blog, home}) => {
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 1) {
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

    let homeHeader = [`fixed-top d-flex align-items-center `]

    if (scrolled) {
        homeHeader.push('header-scrolled');
    }

    let logo = ['home-logo']
    if (scrolled) {
        logo.push('scrolled-logo')
    }

    return (
        <Fragment>
            {blog &&
            <header id='header' className={navbarClasses.join(" ")}>
                <div className="container">
                    <div className={`d-flex align-items-center justify-content-between`}>
                        <Logo scrolled={scrolled}/>
                        <BlogNav/>
                    </div>
                </div>
            </header>
            }
            {home && <header id='home-header' className={homeHeader.join(" ")}
                              >
                <div className="container">
                    <div className='header-container d-flex align-items-center justify-content-between'>
                        <div className={logo.join(' ')}>
                            <Link href='/'>
                                <a>
                                    <Image
                                        className="img-fluid"
                                        width={128}
                                        height={73}
                                        src={`/logo/logo.png`}
                                        alt={'logo'}
                                    />
                                </a>
                            </Link>
                        </div>
                        <Nav/>
                    </div>
                </div>
            </header>
            }
            {!blog && !home &&
            <header id='header' className={navbarClasses.join(" ")}>
                <div className="container">
                    <div className={`d-flex align-items-center justify-content-between`}>
                        <Logo scrolled={scrolled}/>
                        <Nav/>
                    </div>
                </div>
            </header>}
        </Fragment>
    );
};

export default Header;