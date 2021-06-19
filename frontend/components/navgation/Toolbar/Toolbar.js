
import Logo from "../Logo";
import NavigationItems from "../Navigationitems/NavigationItems";
import DrawerToggle from "../Sidedrawer/DrawerToggle/DrawerToggle";
import {useEffect, useState} from "react";


const Toolbar = ({showSideDrawer}) => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        console.log(window.scrollY)
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    let navbarClasses = ['header d-flex align-items-center'];
    if (scrolled) {
        navbarClasses.push('fixed-top');
    }
    return (
        <header className={navbarClasses.join(" ")}>
                <div className='container d-flex justify-content-between'>
                    <Logo/>
                    <div className={`desktop-only`}><NavigationItems/></div>
                    <DrawerToggle clicked={showSideDrawer}/>
                </div>
        </header>

    );
};

export default Toolbar;