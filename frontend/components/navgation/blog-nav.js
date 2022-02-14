import React from 'react';
import useSWR from "swr";
import {API} from "../../config";
import {fetcher} from "../reusables/functions/fetcher";
import useToggle from "../../hooks/useToggle";
import MyLink from "./myLink";

import BlogDrop from "./blog-dropdown";
import {isAuth, signout} from "../../actions/auth";
import Router from "next/router";

const BlogNav = () => {
    const [closed, toggleClosed] = useToggle();
    let attachedClasses = [`navbar`];

    if (closed) {
        attachedClasses.push('navbar-mobile')
    }


    const {data, error} = useSWR(
        [
            `${API}/categories`,
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
        return <p>Loading categories</p>
    }


    function showLinks() {
        return data.map(cat => {
            return <BlogDrop
                key={cat._id}
                caption={cat.name}
                slug={cat.slug}
            />
        })
    }


    return (
        <nav id='navbar' className={`${attachedClasses.join(' ')}`}>
            <ul>
                <MyLink caption={'Home'} to='/blogs'/>
                {showLinks()}
                {isAuth() && <li
                    onClick={() => signout(() => Router.replace(`/signin`))}>
                    <a>Signout</a>
                </li>
                }
                {!isAuth() && <MyLink caption={'Login'} to='/signin'/>}


            </ul>
            <i className={`${closed ? 'bi bi-x' : 'bi bi-list'} mobile-nav-toggle`} onClick={toggleClosed}/>
        </nav>
    );
};

export default BlogNav;