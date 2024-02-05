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

                {dynamicCategories.map(category => (
                    <Dropdown
                        key={category._id}
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

                {isAuth() && isAuth().role === 0 && (
                    <MyLink to="/user" clicked={closeMobileNav}>Dashboard</MyLink>
                )}
                {isAuth() && isAuth().role === 1 && (
                    <MyLink to="/admin2" clicked={closeMobileNav}>Dashboard</MyLink>
                )}


                {isAuth() && (
                    <li
                        onClick={() => signout(() => Router.replace(`/signin`))}
                    >
                        <div className="signOut">Signout</div>
                    </li>
                )}

                <MyLink
                    to="/contact"
                    clicked={closeMobileNav}
                >Contact Us</MyLink>
                  <MyLink external
                          className="staff-link"
                        to="https://mail.vihigahospital.go.ke/"
                        clicked={closeMobileNav}
                >
                    Access staff mail
                </MyLink>




            </ul>
            <MobileNavToggle clicked={toggleOpen} isOpen={open}/>
        </nav>
    );
};

export default Nav;
