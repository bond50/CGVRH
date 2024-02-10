import Router from 'next/router';

import MyLink from './nav-link/myLink';
import React, {useState} from 'react';
import {isAuth, signout} from '../../actions/auth';
import Dropdown from './dropdown/dropdown';
import {mediaList} from './dropdown-links';
import MobileNavToggle from './mobile-nav/mobile-nav-toggle';
import DynamicCats from "./dynamic-cats";
import Backdrop from "./Backdrop";


const Nav = () => {

    const [open, setOpen] = useState(false);

    const dynamicCategories = DynamicCats();
    console.log('Dynamic',dynamicCategories)

    const toggleOpen = () => {
        setOpen((prevState) => !prevState);
    };

    const closeMobileNav = () => {
        setOpen(false);
    };


    return (
        <nav id="navbar" className={`navbar ${open ? 'show-mobile-nav' : null}`}>
            <Backdrop clicked={closeMobileNav} show={open}/>

            <ul>
                {/*<MyLink*/}
                {/*    to="/"*/}
                {/*    clicked={closeMobileNav}*/}
                {/*>Home*/}
                {/*</MyLink>*/}
                <MyLink
                    to="/about-us"
                    clicked={closeMobileNav}
                >About us
                </MyLink>
                {dynamicCategories&&dynamicCategories.map((category, i) => (
                    <Dropdown
                        link={'/services'}
                        key={i}
                        caption={category.name}
                        backendSlug={category.slug}
                        clicked={closeMobileNav}
                    />
                ))}

                <MyLink
                    to="/tenders"
                    clicked={closeMobileNav}
                >Tenders</MyLink>
                <Dropdown
                    clientSideList={mediaList} caption={'Media'}
                    clicked={closeMobileNav}/>

                <MyLink to="/blogs" clicked={closeMobileNav}>News and Events</MyLink>
                <MyLink to="/contact" clicked={closeMobileNav}>Contact Us</MyLink>


                {isAuth() && (
                    <MyLink to="/admin2" clicked={closeMobileNav}>Dashboard</MyLink>
                )}


                {isAuth() && (
                    <li
                        onClick={() => signout(() => Router.replace(`/signin`))}
                    >
                        <a href='#' className="">Signout</a>
                    </li>
                )}

                <li>
                    <a href="https://mail.vihigahospital.go.ke" className='staff-link'>Access staff mail</a>
                </li>

                {/*<MyLink external*/}
                {/*        className="staff-link"*/}
                {/*        to="/"*/}
                {/*        clicked={closeMobileNav}*/}
                {/*>*/}
                {/*    */}
                {/*</MyLink>*/}


            </ul>
            <MobileNavToggle clicked={toggleOpen} isOpen={open}/>
        </nav>
    );
};

export default Nav;
