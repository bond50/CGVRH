import {aboutList, mediaList, servicesList,} from "./dropdown-links";
import {useRouter} from "next/router";
import SingleDropdown from "./single-dropdown";

import {useEffect, useState} from "react";

import useSWR from "swr";
import {API} from "../../config";
import classes from '../../styles/Nav.module.css'
import MenuItem from "./singe_link/menu-item";

const Nav = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false)

    const {data: services, error: serviceError} = useSWR(`${API}/list-service-names-slugs`)

    if (serviceError) {
        return <p className='uh-oh'>Failed to fetch medical services.</p>
    }
    if (!services) {
        return <div className='preloader'/>
    }

    const lists = [
        {to: '/', caption: 'Home',reload: false},
        {caption: 'About', component: aboutList, to: "about",reload: false},
        {caption: 'Services', component: servicesList, to: 'services',reload: false},
        {caption: 'Medical services', component: services, to: 'services',reload: false},
        {caption: 'Media', component: mediaList, to: 'media',reload: false},
        {to: '/blogs/', caption: 'Blog', reload: true},
        {to: '/contact/', caption: 'Contact',reload: false},
    ]


    const MobileToggle = () => {
        setOpen(open => !open)
    };

    const closeMobile = () => {
        setOpen(false)
    };


    let attachedClasses = [`navbar ${classes.Navbar}order-last order-lg-0`];

    if (open) {
        attachedClasses = [classes.NavbarMobile, classes.NavOpen];
    }


    const renderNavigationItems = () => {
        return lists.map((list, index) => {
                if (list.component) {

                    return <SingleDropdown
                        deepText={list.caption}
                        reload={list.reload}
                        key={index}>
                        {list.component.map(lis => {
                                return <MenuItem
                                    key={lis._id}
                                    text={lis.title}
                                    href={`/${list.to}/${lis.slug}`}
                                    className={router.asPath === lis.href ? 'active' : null}/>;
                            }
                        )}
                    </SingleDropdown>


                } else {
                    return <MenuItem
                        key={index}
                        text={list.caption}
                        href={list.to}
                        className={router.asPath === list.to ? `nav-link active` : null}/>
                }
            }
        )
    }


    return (
        <nav className={`${attachedClasses.join(' ')}`}>
            <ul className={classes.MenuItems}>
                {renderNavigationItems()}
            </ul>
            <i className={`${open ? 'bi bi-x' : 'bi bi-list'} ${classes.MobileNavToggle}`} onClick={MobileToggle}/>
        </nav>
    );
};

export default Nav;