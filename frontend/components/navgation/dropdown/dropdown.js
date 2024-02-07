// import React, {useEffect, useState} from 'react';
// import Link from 'next/link';
// import useToggle from "../../../hooks/useToggle";
// import {singleCategory} from "../../../actions/category";
//
// const Dropdown = ({caption, backendSlug, clientSideList}) => {
//     const [isOpen, handleClick] = useToggle();
//
//     const [loadedPages, setLoadedPages] = useState([])
//
//     useEffect(() => {
//             if (backendSlug) {
//                 singleCategory(backendSlug, 'page-cat-name').then(res => {
//                     setLoadedPages(res.pages)
//                 })
//             }
//         }
//         ,
//         [backendSlug])
//
//
//     return (
//         <li className={`${classes.Dropdown}`}>
//             <div className={`${classes.DropdownToggler} ${isOpen ? classes.DropdownTogglerActive : ''}`} role="button">
//                 <span>{caption}</span>
//             </div>
//             <div className={`${classes.DropdownItem} ${isOpen ? classes.DropdownActive : ''}`} onClick={handleClick}>
//                 {clientSideList && clientSideList.map(l => (
//                     <div className={`${classes.DropdownItems}`} key={l._id}>
//                         <Link href={l.to}>
//                             <a className={`${classes.Links} nav-link`}>{l.title}</a>
//                         </Link>
//                     </div>
//                 ))}
//
//                 {loadedPages.map(l => (
//                     <div className={`${classes.DropdownItems}`} key={l._id}>
//                         <Link href={`/services/${l.slug}`}>
//                             <a className={`${classes.Links} nav-link`}>{l.title}</a>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </li>
//     );
// };
//
// export default Dropdown;


import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import useToggle from "../../../hooks/useToggle";
import {singleCategory} from "../../../actions/category";
import {Icon} from "@iconify/react";

const Dropdown = ({caption, clicked, link, backendSlug, clientSideList}) => {
    const [isOpen, handleClick] = useToggle();

    const [loadedPages, setLoadedPages] = useState([])

    useEffect(() => {
            if (backendSlug) {
                singleCategory(backendSlug, 'page-cat-name').then(res => {
                    setLoadedPages(res.pages)
                })
            }
        }
        ,
        [backendSlug])


    function chunkArray(array) {
        const itemsPerChunk = Math.floor(array.length / 4);
        const remainder = array.length % 4;
        const chunks = [];
        let index = 0;

        for (let i = 0; i < 4; i++) {
            // Calculate the chunk size and add 1 if there's a remainder
            const chunkSize = itemsPerChunk + (i < remainder ? 1 : 0);
            chunks.push(array.slice(index, (index += chunkSize)));
        }

        return chunks;
    }


    if (clientSideList) {
        if (clientSideList.length < 9) {
            return (
                <li className={`dropdown`} onClick={handleClick}>
                       {link ? <Link href={link}>
                        <a>
                            <span onClick={clicked} >{caption}</span>
                            <i className="bi bi-chevron-down dropdown-indicator"></i>
                        </a>
                    </Link> : <a>
                        <span>{caption}</span>
                        <i className="bi bi-chevron-down dropdown-indicator"></i>
                    </a>}
                    <ul className={`${isOpen ? 'dropdown-active' : null}`}>
                        {clientSideList.map((l,i) => (
                            <li key={i} onClick={clicked}>
                                <Link href={l.to}>
                                    <a><span>{l.title}</span></a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            );
        } else {
            const chunkedItems = chunkArray(clientSideList,4);

            return (
                <li className={`dropdown megamenu`} onClick={handleClick}>
                    {link ? <Link href={link}>
                        <a>
                            <span onClick={clicked}>{caption}</span>
                            <i className="bi bi-chevron-down dropdown-indicator"></i>
                        </a>
                    </Link> : <a>
                        <span>{caption}</span>
                        <i className="bi bi-chevron-down dropdown-indicator"></i>
                    </a>}
                    <ul className={`${isOpen ? 'dropdown-active' : null}`}>
                        {chunkedItems.map((chunk, index) => {
                            console.log('CHUNK', chunk)
                            return (
                                <li key={index} onClick={clicked}>
                                    {chunk.map((item,i) => {
                                        return (
                                            <Link href={item.to} key={i}>
                                                <a onClick={handleClick}>
                                                    <span className='d-flex align-items-center'><Icon
                                                        icon="solar:round-double-alt-arrow-right-line-duotone"
                                                        className='icon2'/>{item.title}  </span>
                                                </a>
                                            </Link>
                                        );
                                    })}
                                </li>
                            );
                        })}
                    </ul>
                </li>
            );
        }
    } else if (backendSlug) {
        if (loadedPages.length < 9) {
            return (
                <li className={`dropdown`} onClick={handleClick}>
                    {link ? <Link href={link}>
                        <a>
                            <span onClick={clicked}>{caption}</span>
                            <i className="bi bi-chevron-down dropdown-indicator"></i>
                        </a>
                    </Link> : <a>
                        <span>{caption}</span>
                        <i className="bi bi-chevron-down dropdown-indicator"></i>
                    </a>}
                    <ul className={`${isOpen ? 'dropdown-active' : null}`}>
                        {loadedPages.map((item,i) => (
                            <li key={i} onClick={clicked}>
                                <Link href={`/services/${item.slug}`} key={item._id}>
                                    <a> <span>{item.title}</span> </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            );
        } else {
            const chunkedItems = chunkArray(loadedPages, 4);
            return (
                <li className={`dropdown megamenu`} onClick={handleClick}>
                     {link ? <Link href={link}>
                        <a>
                            <span onClick={clicked}>{caption}</span>
                            <i className="bi bi-chevron-down dropdown-indicator"></i>
                        </a>
                    </Link> : <a>
                        <span>{caption}</span>
                        <i className="bi bi-chevron-down dropdown-indicator"></i>
                    </a>}
                    <ul className={`${isOpen ? 'dropdown-active' : null}`}>
                        {chunkedItems.map((chunk, index) => (
                            <li key={index} onClick={clicked}>
                                {chunk.map((item) => (
                                    <Link href={`/services/${item.slug}`} key={item._id}>
                                        <a>
                                            <span className='d-flex align-items-center'>
                                                <Icon icon="solar:round-double-alt-arrow-right-line-duotone"
                                                      className='icon2'/>
                                                {item.title}
                                            </span>
                                        </a>
                                    </Link>
                                ))}
                            </li>
                        ))}
                    </ul>
                </li>
            );
        }

    }

    return null;

};

export default Dropdown;
