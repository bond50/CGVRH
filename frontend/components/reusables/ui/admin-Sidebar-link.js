import React from 'react';
import classes from "../../../styles/admin-sidebar-link.module.css";
import Link from "next/link";

const AdminSidebarLink = ({slug, title, icon}) => {
    return (
        <li className={`${classes.SidebarListItem}  nav-item`}>
            <Link href={`/admin2/${slug}`}>
                <a className={`nav-link ${classes.NavLink}`}>
                    <i className={`bi bi-${icon}`}/>
                    <span>{title}</span>
                </a>
            </Link>
        </li>
    );
};

export default AdminSidebarLink;