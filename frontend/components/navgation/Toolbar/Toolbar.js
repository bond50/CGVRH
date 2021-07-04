import Logo from "../Logo";
import NavigationItems from "../Navigationitems/NavigationItems";
import DrawerToggle from "../Sidedrawer/DrawerToggle/DrawerToggle";
import classes from '../../../styles/Header.module.css'
import {useEffect, useState} from "react";


const Toolbar = ({showSideDrawer}) => {
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
    })

    let navbarClasses = [`${classes.Header} d-flex align-items-center`];

    if (scrolled) {
        navbarClasses.push(`fixed-top ${classes.Fixed}`);
    }

    return (
        <header className={navbarClasses.join(" ")}>
            <div className='container d-flex justify-content-between'>
                <Logo/>
                <div className={`${classes.DesktopOnly}`}><NavigationItems/></div>
                {/*<DrawerToggle clicked={showSideDrawer}/>*/}
            </div>
        </header>

    );
};

export default Toolbar;