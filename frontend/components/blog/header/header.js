import classes from './header.module.css'
import Link from "next/link";
import Search from "../Search";
import Image from "next/image";
import React from "react";
import BlogMegaWrapper from "./blog-mega-wrapper";
import Logo from "../../navgation/Logo";
import SignUp from "../../navgation/Toolbar/Navigationitems/SignUp";
import SignOut from "../../navgation/Toolbar/Navigationitems/Signout";
import Signout from "../../navgation/Toolbar/Navigationitems/Signout";
import useToggle from "../../../hooks/useToggle";

const Header = ({categories}) => {

    const [closed, toggleClosed] = useToggle();

    let attachedClasses = [classes.Navbar];

    if (closed) {
        attachedClasses = [classes.Navbar,classes.MobileMenu];
    }

    function showBlogMegaWrapper() {
        return categories.map(cat => {
            return <BlogMegaWrapper
                key={cat._id}
                categoryName={cat.name}
                slug={cat.slug}/>
        })
    }

    return (
        categories.length > 0 && < >

            {/*<div className='container'>*/}
            {/*   <div className={`${classes.Logo} me-auto`}>*/}
            {/*        <a href="index.html"><img src="/logo/logo.png" alt="" className="img-fluid"/></a>*/}
            {/*        <div className={`${classes.Header} me-auto `}>*/}
            {/*            <h1>Vihiga County Referral Hospital</h1>*/}
            {/*            <p>We take care of your precious health</p>*/}
            {/*        </div>*/}
            {/*        <Search/>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className=' container d-flex align-items-center me-auto'>
                <Link href={`/user/crud/blog`}>Write a blog</Link>
                <Signout/>
            </div>
            <div className={`d-flex align-items-center  ${classes.Topbar}`}>
                <div className="container d-flex align-items-center justify-content-center justify-content-between">
                    <Logo/>
                    <Search/>
                </div>
            </div>


            <nav className={attachedClasses}>
                <div className='container'>
                    <ul className={` ${classes.Menu} `}>
                        <li className={classes.MenuItem}>
                            <Link href={'/blogs'}>
                                <a className={classes.Link}>Blog Home</a>
                            </Link>
                        </li>
                        {showBlogMegaWrapper()}
                    </ul>
                    <i className={`${open ? 'bi bi-x' : 'bi bi-list'} mobile-nav-toggle`} onClick={toggleClosed}/>
                </div>
            </nav>

        </>

    )
        ;
};

export default Header;