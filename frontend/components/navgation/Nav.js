import SingleLink from "./single-link"
import {aboutList, covidList, mediaList, servicesList} from "./dropdown-links";

import {useRouter} from "next/router";
import SingleDropdown from "./single-dropdown";
import {useState} from "react";

const Nav = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter();
    const lists = [
        {to: '/', caption: 'Home'},
        {caption: 'About', component: aboutList, to: '/about/'},
        {caption: 'Services', component: servicesList, to: '/services/'},
        {caption: 'Media', component: mediaList, to: '/media/'},
        {to: '/blogs/', caption: 'Blog',},
        {to: '/contact/', caption: 'Contact'},
        {caption: 'Covid 19', component: covidList, to: '/covid/'},
    ]


    const MobileToggle = () => {
        setOpen(open => !open)
    };

    let attachedClasses = [];

    if (open) {
        attachedClasses = ['navbar-mobile','nav-open'];
    }


    const renderNavigationItems = () => {
        return lists.map((list, index) => {
                if (list.component) {
                    return <SingleDropdown
                        deepText={list.caption}
                        key={index} >
                        {list.component.map((lis, i) =>
                            <SingleLink
                                key={i}
                                text={lis.text}
                                href={lis.href}
                                className={router.asPath === lis.href ? 'active' : null}/>
                        )}
                    </SingleDropdown>
                } else {
                    return <SingleLink
                        key={index}
                        text={list.caption}
                        href={list.to}
                        className={router.asPath === list.to ? `nav-link active` : null}/>
                }
            }
        )
    }


    return (
        <nav id="navbar" className={`navbar ${attachedClasses.join(' ')}`}>
            <ul>
                {renderNavigationItems()}
            </ul>
            <i className={`${open ? 'bi bi-x' : 'bi bi-list'} mobile-nav-toggle`} onClick={MobileToggle}/>
        </nav>
    );
};

export default Nav;