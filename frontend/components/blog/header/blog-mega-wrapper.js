import React, {useEffect, useState} from 'react';
import classes from "./header.module.css";
import useToggle from "../../../hooks/useToggle";
import {singleCategory} from "../../../actions/category";
import BlogLists from "./blog-lists";

export const BlogMegaWrapper = ({categoryName, slug}) => {
    const [closed, toggleClosed] = useToggle();
    const [blogs, setBlogs] = useState([])
    let attachedClasses = [classes.Container];
    if (closed) {
        attachedClasses = [classes.Container, classes.ToggleDrop];
    }

    useEffect(() => {
            singleCategory(slug, 'category').then(res => {
                setBlogs(res.blogs)
            })
        }
        ,
        [])

    return (
        <li className={classes.MenuItem} onClick={toggleClosed}>
            <a className={`${classes.Link} ${classes.HasDropdown}`}>
                <span>{categoryName}</span>
                {blogs.length > 0 && <i className={closed ? `bi bi-chevron-up` : `bi bi-chevron-down`}/>}
            </a>
            {blogs.length > 0 && <div className={attachedClasses.join(' ')}>
                <ul className={classes.ContainerList}>
                    <BlogLists blogs={blogs}/>
                </ul>
            </div>}
        </li>
    );
};

export default BlogMegaWrapper;