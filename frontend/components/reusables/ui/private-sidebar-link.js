import React from 'react';
import classes from "../../../styles/admin-sidebar-link.module.css";
import Link from "next/link";

const PrivateSidebarLink = ({slug, title, icon}) => {
    return (
        <li className={`${classes.SidebarListItem}  nav-item`}>
            <Link href={`/user/${slug}`}>
                <a className={`nav-link ${classes.NavLink}`}>
                    <i className={`bi bi-${icon}`}/>
                    <span>{title}</span>
                </a>
            </Link>
        </li>
    );
};

export default PrivateSidebarLink;