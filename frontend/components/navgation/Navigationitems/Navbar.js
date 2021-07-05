import About from "../About";
import Services from "../Services";
import Media from "../Media";
import Covid from "../Covid";
import {isAuth} from "../../../actions/auth";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import SignOut from "../Signout";
import {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import classes from '../../../styles/Navbar.module.css'
import MyDropdown from "./Dropdown";


const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(true)

    const links = [
        {to: '/', caption: 'Home'},
        {to: '/about/', caption: 'About', component: <About/>},
        {to: '/services/', caption: 'Services', component: <Services/>},
        {to: '/media/', caption: 'Media', component: <Media/>},
        {to: '/blogs/', caption: 'Blog',},
        {to: '/tenders/tenders/', caption: 'Tenders',},
        {to: '/training/', caption: 'Training',},
        {to: '/contact/', caption: 'Contact'},
        {to: '/covid/', caption: 'Covid 19', component: <Covid/>},

    ]
    const router = useRouter();

    const renderLinks = () => {
        return links.map((link, i) => {

            if (link.component) {
                return <MyDropdown className={classes.dropdown} caption={link.caption} clicked={toggleDropdown}>
                    <ul>
                        {link.component}
                    </ul>
                </MyDropdown>
            } else {
                return <li key={i}>
                    <Link href={link.to}>
                        <a className={`nav-link ${router.asPath === link.to ? classes.active : null}`}>{link.caption}</a>
                    </Link>
                </li>
            }
        })
    }


    const changeClass = () => {
        setOpen(((open) => !open))
    };

    const toggleDropdown = () => {
        setActive(((active) => !active))
    };


    return (
        <nav className={open ? classes.NavbarMobile : classes.Navbar}>
            <ul>
                {/*{renderLinks()}*/}
                <li><a className="nav-link scrollto" href="#hero">Home</a></li>
                <li><a className="nav-link scrollto" href="#about">About</a></li>
                <li><a className="nav-link scrollto" href="#services">Services</a></li>
                <li><a className="nav-link scrollto " href="#portfolio">Portfolio</a></li>
                <li><a className="nav-link scrollto" href="#team">Team</a></li>

                <li className={classes.dropdown} onClick={toggleDropdown}><a href={`#`}><span>Drop Down</span> <i
                    className="bi bi-chevron-down"/></a>
                    <ul className={active ? `${classes.dropdownActive}` : ''}>
                       <About/>
                    </ul>
                </li>

                <li className={classes.dropdown} onClick={toggleDropdown}><a href={`#`}><span>Services</span> <i
                    className="bi bi-chevron-down"/></a>
                    <ul className={active ? `${classes.dropdownActive}` : ''}>
                       <Services/>
                    </ul>
                </li>

                <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
            </ul>
            <i className={`${!open ? 'bi bi-list' : 'bi bi-x text-white'} ${classes.MobileNavToggle}`}
               onClick={changeClass}/>

            {/*<ul>*/}
            {/*    {renderLinks()}*/}
            {/*    {!isAuth() && <>*/}
            {/*        <SignIn className={`nav-link ${router.asPath === '/signin/' ? classes.active : null}`}/>*/}
            {/*        <SignUp className={`nav-link ${router.asPath === '/signup/' ? classes.active : null}`}/>*/}
            {/*    </>}*/}
            {/*    {isAuth() && <SignOut className={`nav-link ${router.asPath === '/signout/' ? classes.active : null}`}/>}*/}
            {/*</ul>*/}
            {/*<i className={`${!open?'bi bi-list':'bi bi-x text-white'} ${classes.MobileNavToggle}`} onClick={changeClass}/>*/}
        </nav>
    );
};

export default Navbar;