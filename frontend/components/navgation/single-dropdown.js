import useToggle from "../../hooks/useToggle";
import MyLink from "./myLink";
import {useEffect, useState} from "react";
import {singleCategory} from "../../actions/category";

const SingleDropdown = ({ caption, activeClassName, href, slug}) => {
    const [closed, toggleClosed] = useToggle();
    const [loadedPages, setLoadedPages] = useState([])


    useEffect(() => {
            singleCategory(slug, 'page-cat-name').then(res => {
                setLoadedPages(res.pages)
            })
        }
        ,
        [slug])

    const showLoadedPages = () => {
        return loadedPages.map(pg => {
            return <MyLink key={pg._id} to={`/general/${pg.slug}`} caption={pg.title} />
        })

    }
    if (loadedPages.length < 1) {
        return null
    }

    if (loadedPages.length === 1) {
        return showLoadedPages()
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

export default SingleDropdown;