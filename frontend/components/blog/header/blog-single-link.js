import React from 'react';
import classes from "./header.module.css";
import Link from "next/link";

const BlogSingleLink = ({to, text}) => {
    return (
        <li className={classes.ContainerListItem}>
            <i className="bi bi-chevron-bar-contract"/>
            <Link href={to}>
                <a>{text}</a>
            </Link>
        </li>
    );
};

export default BlogSingleLink;