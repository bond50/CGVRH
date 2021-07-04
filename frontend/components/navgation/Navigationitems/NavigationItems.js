import Home from "../Home";
import MyDropdown from "./NavigationItem/Dropdown";
import About from "../About";
import Services from "../Services";
import Media from "../Media";
import Tender from "../Tenders";
import Training from "../Training";
import Contact from "../Contact";
import Covid from "../Covid";
import {isAuth, signout} from "../../../actions/auth";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import SignOut from "../Signout";
import Blogs from "../Blogs";
import classes from '../../../styles/Navbar.module.css'
import NavigationItem from "./NavigationItem/NavigationItem";
import React from "react";
import Router from "next/router";


const NavigationItems = () => {
    return (
        <nav className={classes.Navbar}>
            <ul>

                <NavigationItem className={`nav-link active`} href='/'>
                    Home
                </NavigationItem>


                {/*<MyDropdown text='About Us'>*/}
                {/*    <About/>*/}
                {/*</MyDropdown>*/}
                {/*<MyDropdown text='Services'>*/}
                {/*    <Services/>*/}
                {/*</MyDropdown>*/}
                {/*<MyDropdown text='Media'>*/}
                {/*    <Media/>*/}
                {/*</MyDropdown>*/}

                <NavigationItem className={`nav-link`} href='/tenders/tenders'>
                    Tenders
                </NavigationItem>

                 <NavigationItem className={``} href='#'>
                   Dropdown
                </NavigationItem>


                <NavigationItem className={`nav-link`} href='/training'>
                    Training
                </NavigationItem>
                <NavigationItem className={`nav-link`} href='/contact'>
                    Contact us
                </NavigationItem>
                <NavigationItem className={`nav-link`} href='/blogs'>
                    Blog
                </NavigationItem>

                {!isAuth() && <>
                    <NavigationItem className={`nav-link`} href='/signin'>
                        Sign in
                    </NavigationItem>

                    <NavigationItem className={`nav-link`} href='/signup'>
                        Sign up
                    </NavigationItem>
                </>
                }

                {isAuth() && <NavigationItem
                    className={`nav-link`}
                    href='/signout'
                    clicked={() => signout(() => Router.replace(`/signin`))}>
                    Sign out
                </NavigationItem>}


                {/*<Tender/>*/}
                {/*<Training/>*/}
                {/*<Contact/>*/}
                {/*<MyDropdown text='Covid'>*/}
                {/*    <Covid/>*/}
                {/*</MyDropdown>*/}
                {/*<Blogs/>*/}


                {/*{!isAuth() && <>*/}
                {/*    <SignIn/>*/}
                {/*    <SignUp/>*/}
                {/*</>*/}
                {/*}*/}

                {/*{isAuth() && <SignOut/>}*/}
            </ul>
        </nav>
    );
};

export default NavigationItems;