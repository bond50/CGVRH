import React from 'react';
import classes from "../../../styles/admin-sidebar-link.module.css";
import Link from "next/link";
import { Icon } from "@iconify/react";

const SidebarLink = ({ fullPath, title, icon, currentPath, external }) => {
    const isActive = currentPath === fullPath ? classes.active : '';


    if (external) {
        return (
            <li className={`${classes.SidebarListItem} nav-item`}>
                <a href={fullPath} className={`nav-link ${classes.NavLink} ${isActive}`} target="_blank" rel="noopener noreferrer">
                    <Icon icon={icon} className={classes.icon} />
                    <span>{title}</span>
                </a>
            </li>
        );
    }

    return (
        <li className={`${classes.SidebarListItem} nav-item`}>
            <Link href={fullPath}>
                <a className={`nav-link ${classes.NavLink} ${isActive}`}>
                    <Icon icon={icon} className={classes.icon} />
                    <span>{title}</span>
                </a>
            </Link>
        </li>
    );
};

export default SidebarLink;
