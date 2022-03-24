import MyLink from "./myLink";
import useToggle from "../../hooks/useToggle";
import React, {useEffect, useState} from "react";
import {singleCategory} from "../../actions/category";

export const BlogDrop = ({slug, caption, clicked}) => {
    const [closed, toggleClosed] = useToggle();
    const [loadedPages, setLoadedPages] = useState([])

    useEffect(() => {
            singleCategory(slug, 'category').then(res => {
                setLoadedPages(res.blogs)
            })
        }
        ,
        [])

    const showLoadedPages = () => {
        return loadedPages.map(pg => {
            return <MyLink key={pg._id} to={`/blogs/${pg.slug}`} caption={pg.title} clicked={clicked}/>
        })

    }

    if (loadedPages.length < 1) {
        return null
    }


    return (
        <li className={`dropdown`} onClick={toggleClosed}>
            <a href={'#'}
            >
                <span>{caption} </span> <i
                className="bi bi-chevron-down"/>
            </a>
            <ul className={`${closed ? 'dropdown-active' : null}`}>
                {showLoadedPages()}
            </ul>
        </li>
    );
};

export default BlogDrop;