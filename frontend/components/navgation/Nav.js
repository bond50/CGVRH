import Router from "next/router";
import SingleDropdown from "./single-dropdown";

import useToggle from "../../hooks/useToggle";
import MyLink from "./myLink";
import useSWR from "swr";
import {API} from "../../config";
import {fetcher} from "../reusables/functions/fetcher";
import React from "react";
import Media from "./media";
import {isAuth, signout} from "../../actions/auth";


const Nav = () => {
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

    const showLinks = data.map(link => (
        <SingleDropdown caption={link.name} slug={link.slug} key={link._id}/>
    ))


    return (
        <nav id='navbar' className={`${attachedClasses.join(' ')}`}>
            <ul>
                {showLinks}
                <MyLink caption={'HMT'} to='/about/board-members'/>
                <Media/>

                <MyLink caption={'News and events'} to='/blogs'/>
                <MyLink caption={'Contact'} to='/contact'/>
                {isAuth() && <MyLink caption={'Dashboard'} to='/user'/>}
                {isAuth() && <li
                    onClick={() => signout(() => Router.replace(`/signin`))}>
                    <a>Signout</a>
                </li>
                }
            </ul>
            <i className={`${closed ? 'bi bi-x' : 'bi bi-list'} mobile-nav-toggle`} onClick={toggleClosed}/>
        </nav>
    );
};

export default Nav;