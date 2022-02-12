import {aboutList, mediaList, servicesList,} from "./dropdown-links";
import {useRouter} from "next/router";
import SingleDropdown from "./single-dropdown";

import useToggle from "../../hooks/useToggle";
import MyLink from "./myLink";
import About from "./items/about";
import useSWR from "swr";
import {API} from "../../config";
import {fetcher} from "../reusables/functions/fetcher";
import React from "react";


const Nav = () => {
    const router = useRouter();
    const [closed, toggleClosed] = useToggle();
    let attachedClasses = [`navbar`];

    if (closed) {
        attachedClasses.push('navbar-mobile')
    }


    const {data, error} = useSWR(
        [
            `${API}/page-cats`,
        ],
        fetcher,
        {
            revalidateOnFocus: true,
        },
    );
    if (error) {
        return <p>failed to load categories</p>
    }

    if (!data) {
        return <div className='preloader'/>
    }

    const showLinks = data && data.map(link => (
        <SingleDropdown caption={link.name}  slug={link.slug} key={link._id}/>
    ))


    return (
        <nav id='navbar' className={`${attachedClasses.join(' ')}`}>
            <ul>
                {showLinks}
            </ul>
            <i className={`${closed ? 'bi bi-x' : 'bi bi-list'} mobile-nav-toggle`} onClick={toggleClosed}/>
        </nav>
    );
};

export default Nav;