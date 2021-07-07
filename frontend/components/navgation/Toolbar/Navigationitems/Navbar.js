import {isAuth} from "../../../../actions/auth";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./Signout";
import {useState} from "react";
import {useRouter} from "next/router";
import classes from '../../../../styles/Navbar.module.css'
import MyDropdown from "./Dropdown";
import SingleLink from "./SingleLink";
import {aboutList,servicesList,mediaList,covidList} from "./DropdownLinks";



const Navbar = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter();

    const lists = [
        {to: '/', caption: 'Home'},
        {caption: 'About', component: aboutList,to:'/about/'},
        {caption: 'Services', component: servicesList,to:'/services/'},
        {caption: 'Media', component: mediaList,to:'/media/'},
        {to: '/blogs/', caption: 'Blog',},
        {to: '/tenders/tenders/', caption: 'Tenders',},
        {to: '/training/', caption: 'Training',},
        {to: '/contact/', caption: 'Contact'},
        {caption: 'Covid 19', component: covidList,to:'/covid/'},
    ]


    const renderNavigationItems = () => {
        return lists.map((list, index) => {

                if (list.component) {
                    return <MyDropdown key={index} caption={list.caption} dropLink={`#`}>
                        {list.component.map((lis, i) =>
                            <SingleLink
                                key={i}
                                text={lis.text}
                                href={lis.href}
                                customClassName={router.asPath === lis.href ? classes.active : null}/>
                        )}
                    </MyDropdown>;
                } else {
                    return <SingleLink
                        key={index}
                        text={list.caption}
                        href={list.to}
                        customClassName={router.asPath === list.to ? classes.active : null}/>
                }
            }
        )
    }


    const changeClass = () => {
        setOpen((open) => !open)
    };

    let attachedClasses = [classes.Navbar, classes.Close];

    if (open) {
        attachedClasses = [classes.NavbarMobile, classes.Open];
    }


    return (
        <nav className={attachedClasses.join(' ')}>
            <ul>
                {renderNavigationItems()}
                {isAuth() && <SignOut className={`nav-link ${router.asPath === '/signout/' ? classes.active : null}`}/>}
                {
                    <>
                        <SignIn className={`nav-link ${router.asPath === '/signin/' ? classes.active : null}`}/>
                        <SignUp className={`nav-link ${router.asPath === '/signup/' ? classes.active : null}`}/>
                    </>
                }
            </ul>
            <i
                className={`${!open ? 'bi bi-list' : 'bi bi-x text-white'} ${classes.MobileNavToggle}`}
                onClick={changeClass}
            />
        </nav>
    );
};

export default Navbar;