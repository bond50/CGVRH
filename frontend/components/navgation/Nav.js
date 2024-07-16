import Router from 'next/router';
import MyLink from './nav-link/myLink';
import React, {useState} from 'react';
import useSWR from 'swr';
import {isAuth, signout} from '../../actions/auth';
import Dropdown from './dropdown/dropdown';
import {mediaList} from './dropdown-links';
import MobileNavToggle from './mobile-nav/mobile-nav-toggle';
import DynamicCats from "./dynamic-cats";
import Backdrop from "./Backdrop";
import axios from 'axios';
import {API} from '../../config';

const fetcher = url => axios.get(url).then(res => res.data);

const Nav = ({blog}) => {
    const [open, setOpen] = useState(false);
    const dynamicCategories = DynamicCats();

    const {
        data: blogCategories,
        error: blogCategoriesError
    } = useSWR(blog ? `${API}/categories` : null, fetcher);

    const toggleOpen = () => setOpen(prevState => !prevState);

    const closeMobileNav = () => setOpen(false);

    const renderAuthLinks = () => (
        <>
            {isAuth() && <MyLink to="/admin2" clicked={closeMobileNav}>Dash</MyLink>}
            {isAuth() && (
                <li onClick={() => signout(() => Router.replace(`/signin`))}>
                    <a href='#' className="">Signout</a>
                </li>
            )}
        </>
    );

    return (
        <nav id="navbar" className={`navbar ${blog ? 'blog-nav' : ''} ${open ? 'show-mobile-nav' : ''}`}>
            <Backdrop clicked={closeMobileNav} show={open}/>
            <ul>
                {blog ? (
                    <>
                        <MyLink to="/blog" clicked={closeMobileNav}>Home</MyLink>
                        {blogCategoriesError && <li>Error loading categories</li>}
                        {!blogCategories ? (
                            <li>Loading categories...</li>
                        ) : (
                            blogCategories.map((category, i) => (
                                <MyLink key={i} to={`/categories/${category.slug}`} clicked={closeMobileNav}>
                                    {category.name}
                                </MyLink>
                            ))
                        )}
                        {renderAuthLinks()}
                    </>
                ) : (
                    <>
                        <MyLink to="/" clicked={closeMobileNav}>Home</MyLink>
                        <MyLink to="/about-us" clicked={closeMobileNav}>About us</MyLink>
                        {dynamicCategories.map((category, i) => (
                            <Dropdown
                                link={'/services'}
                                key={i}
                                caption={category.name}
                                backendSlug={category.slug}
                                clicked={closeMobileNav}
                            />
                        ))}
                        <MyLink to="/tenders" clicked={closeMobileNav}>Tenders</MyLink>
                        <Dropdown clientSideList={mediaList} caption={'Media'} clicked={closeMobileNav}/>
                        <MyLink to="/blog" clicked={closeMobileNav}>News and Events</MyLink>
                        <MyLink to="/contact" clicked={closeMobileNav}>Contact Us</MyLink>
                        {renderAuthLinks()}
                        {!isAuth() && <li>
                            <a href="https://mail.vihigahospital.go.ke" className='staff-link'>Access staff mail</a>
                        </li>}
                    </>
                )}
            </ul>
            <MobileNavToggle clicked={toggleOpen} isOpen={open}/>
        </nav>
    );
};

export default Nav;
