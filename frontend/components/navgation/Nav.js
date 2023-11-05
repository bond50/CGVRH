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
import About from "./About";
import Preloader from "../preloader";


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
        return <Preloader/>
    }

    const showLinks = data.map(link => (
        <SingleDropdown caption={link.name} slug={link.slug} key={link._id}/>
    ))


    return (
        <nav id='navbar' className={`${attachedClasses.join(' ')}`}>
            <ul>
                <About clicked={() => toggleClosed(false)}/>
                {showLinks}
                <Media clicked={() => toggleClosed(false)}/>
                 <MyLink caption={'Tenders'} to='/tenders' clicked={() => toggleClosed(false)}/>
                <MyLink caption={'Blog'} to='/blogs' clicked={() => toggleClosed(false)}/>
                <MyLink caption={'Contact'} to='/contact' clicked={() => toggleClosed(false)}/>
                {isAuth() && isAuth().role === 0 &&
                <MyLink caption={'Dashboard'} to='/user' clicked={() => toggleClosed(false)}/>}
                {isAuth() && isAuth().role === 1 &&
                <MyLink caption={'Dashboard'} to='/admin2' clicked={() => toggleClosed(false)}/>}
                {/*<Corona/>*/}
                {isAuth() && <li
                    onClick={() => signout(() => Router.replace(`/signin`))}>
                    <div className='signOut'>Signout</div>
                </li>
                }
                <li>
                   <a className="getstarted " href="https://mail.vihigahospital.go.ke/">Staff Mail</a>
                </li>
            </ul>
            <i className={`${closed ? 'bi bi-x text-white' : 'bi bi-list '} mobile-nav-toggle`}
               onClick={toggleClosed}/>
        </nav>
    );
};

export default Nav;