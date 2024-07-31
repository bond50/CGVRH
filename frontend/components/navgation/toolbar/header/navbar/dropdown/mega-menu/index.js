import React, { useEffect } from 'react';
import styles from '../../../../../../../styles/MegaMenu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const chunkArray = (array, chunkSize) => {
    const chunks = Array.from({ length: chunkSize }, () => []);
    array.forEach((item, index) => {
        chunks[index % chunkSize].push(item);
    });
    return chunks;
};

const MegaMenu = ({ items, onClick, isOpen, setActive }) => {
    const router = useRouter();

    useEffect(() => {
        const isActiveLink = items.some(item => {
            const href = item.slug ? `/services/${item.slug}` : item.to;
            return router.asPath === href;
        });

        setActive(isActiveLink);
    }, [items, router.asPath, setActive]);

    const handleClick = (e, href) => {
        onClick(e);
        router.push(href);
    };

    return (
        <ul className={`${styles.MegaMenuList} ${isOpen ? styles.Visible : ''}`}>
            {chunkArray(items, 4).map((chunk, index) => (
                <li key={index} className={`${styles.MegaMenuItem}`}>
                    {chunk.map((item, i) => {
                        const href = item.slug ? `/services/${item.slug}` : item.to;
                        const isActive = router.asPath === href;
                        return (
                            <Link href={href} key={i}>
                                <a className={isActive ? styles.Active : ''} onClick={(e) => handleClick(e, href)}>
                                    {item.title}
                                </a>
                            </Link>
                        );
                    })}
                </li>
            ))}
        </ul>
    );
};

export default MegaMenu;
