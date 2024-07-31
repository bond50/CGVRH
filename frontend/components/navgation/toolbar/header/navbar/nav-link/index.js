import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../../../../../styles/NavLink.module.css';

const NavLink = ({ children, to, onClick, signout }) => {
    const router = useRouter();
    const isActive = router.pathname === to;

    if (signout) {
        return (
            <li onClick={onClick}>
                <a href='#' className={`${isActive ? styles.active : ''}`}>{children}</a>
            </li>
        );
    }

    return (
        <li onClick={onClick} className={styles.NavItems}>
            <Link href={to}>
                <a className={`${styles.navLink} ${isActive ? styles.active : ''}`}>{children}</a>
            </Link>
        </li>
    );
};

export default NavLink;
