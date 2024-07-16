import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import useToggle from "../../../hooks/useToggle";
import {singleCategory} from "../../../actions/category";


const Dropdown = ({caption, clicked, link, backendSlug, clientSideList}) => {
    const [isOpen, handleClick] = useToggle();

    const [loadedPages, setLoadedPages] = useState([])

    useEffect(() => {
        let isMounted = true;

        if (backendSlug) {
            singleCategory(backendSlug, 'page-cat-name').then(res => {
                if (isMounted) {
                    setLoadedPages(res.pages);
                }
            }).catch(err => {
                if (isMounted) {
                    console.log(err);
                }
            });
        }

        return () => {
            isMounted = false;
        };
    }, [backendSlug]);


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
                            <span onClick={clicked}>{caption}</span>
                            <i className="bi bi-chevron-down dropdown-indicator"></i>
                        </a>
                    </Link> : <a>
                        <span>{caption}</span>
                        <i className="bi bi-chevron-down dropdown-indicator"></i>
                    </a>}
                    <ul className={`${isOpen ? 'dropdown-active' : null}`}>
                        {clientSideList.map((l, i) => (
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
            const chunkedItems = chunkArray(clientSideList, 4);

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
                                    {chunk.map((item, i) => {
                                        return (
                                            <Link href={item.to} key={i}>
                                                <a onClick={handleClick}>
                                                    <span className='d-flex align-items-center'>
                                                        {item.title}
                                                    </span>
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
                        {loadedPages.map((item, i) => (
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
