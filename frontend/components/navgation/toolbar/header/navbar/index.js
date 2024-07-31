import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { isAuth, signout } from '../../../../../actions/auth';
import Dropdown from './dropdown';
import { mediaList } from './dropdown/dropdown-links';
import { fetcher } from "../../../../../axios/axios";
import NavLink from "./nav-link";
import styles from '../../../../../styles/Navbar.module.css';
import Backdrop from "./mobile/backdrop/Backdrop";
import MobileNavToggle from "./mobile/mobile-nav-toggle";
import StaffLink from "./nav-link/staff-link";
import Router from "next/router";

const Navbar = ({ blog }) => {
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Fetch categories based on the type of page
    const { data: serviceCategories, error: serviceCategoryError } = useSWR(!blog ? `/page-cats` : null, fetcher, {
        revalidateOnFocus: true,
    });
    const { data: blogCategories, error: blogCategoriesError } = useSWR(blog ? `/categories` : null, fetcher, {
        revalidateOnFocus: true,
    });

    useEffect(() => {
        if (closing) {
            const timeout = setTimeout(() => setClosing(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [closing]);

    // Toggle mobile navigation
    const toggleOpen = () => {
        if (open) {
            setClosing(true);
            setTimeout(() => {
                setOpen(false);
                setClosing(false);
            }, 300); // Duration of the slide out animation
        } else {
            setOpen(true);
        }
    };

    // Close mobile navigation
    const closeMobileNav = () => {
        setClosing(true);
        setTimeout(() => {
            setOpen(false);
            setClosing(false);
        }, 300); // Duration of the slide out animation
    };

    // Handle sign out
    const handleSignout = () => {
        signout(() => Router.replace(`/signin`))
            .then(closeMobileNav)
            .catch(err => {
                console.log(err);
                closeMobileNav();
            });
    };

    // Render authentication links
    const renderAuthLinks = () => (
        <>
            {isAuth() && <NavLink to="/admin2" onClick={closeMobileNav}>Dashboard</NavLink>}
            {isAuth() && (
                <NavLink to="#" onClick={handleSignout} signout>
                    Signout
                </NavLink>
            )}
        </>
    );

    return (
        <nav className={`${styles.navbar} ${open ? styles.ShowMobileNav : ''} ${closing ? styles.HideMobileNav : ''}`}>
            {open && <Backdrop clicked={toggleOpen} show={open} />}
            <ul className={`${styles.navigationList}`}>
                {blog ? (
                    <>
                        <NavLink to="/blog" onClick={closeMobileNav}>Home</NavLink>
                        {blogCategoriesError && <li>Error loading categories</li>}
                        {!blogCategories ? (
                            <li>Loading categories...</li>
                        ) : (
                            blogCategories.map((category, i) => (
                                <NavLink key={i} to={`/categories/${category.slug}`} onClick={closeMobileNav}>
                                    {category.name}
                                </NavLink>
                            ))
                        )}
                        {renderAuthLinks()}
                    </>
                ) : (
                    <>
                        <NavLink to="/" onClick={closeMobileNav}>Home</NavLink>
                        <NavLink to="/about-us" onClick={closeMobileNav}>About us</NavLink>
                        {serviceCategoryError && <li>Error loading services</li>}
                        {!serviceCategories ? (
                            <li>Loading services...</li>
                        ) : (
                            serviceCategories.map((category, i) => (
                                <Dropdown
                                    key={i}
                                    caption={category.name}
                                    backendSlug={category.slug}
                                    isMobileNavOpen={open} // Pass the mobile nav open state
                                    closeMobileNav={closeMobileNav}
                                    isOpen={activeDropdown === category.slug}
                                    setActiveDropdown={setActiveDropdown}
                                />
                            ))
                        )}
                        <NavLink to="/tenders" onClick={closeMobileNav}>Tenders</NavLink>
                        <Dropdown
                            clientSideList={mediaList}
                            caption="Media"
                            isMobileNavOpen={open} // Pass the mobile nav open state
                            closeMobileNav={closeMobileNav}
                            isOpen={activeDropdown === 'Media'}
                            setActiveDropdown={setActiveDropdown}
                        />
                        <NavLink to="/blog" onClick={closeMobileNav}>Blog</NavLink>
                        <NavLink to="/contact" onClick={closeMobileNav}>Contact Us</NavLink>
                        {renderAuthLinks()}
                        {!isAuth() && (
                            <StaffLink/>
                        )}
                    </>
                )}
            </ul>
            <MobileNavToggle clicked={toggleOpen} isOpen={open} />
        </nav>
    );
};

export default Navbar;
