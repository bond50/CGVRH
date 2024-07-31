import React, {useEffect} from 'react';
import styles from '../../../../../../../styles/LinkList.module.css';
import Link from 'next/link';
import {Icon} from '@iconify/react';
import {useRouter} from 'next/router';

const LinkList = ({links, onClick, isOpen, closeMobileNav, setActive}) => {
    const router = useRouter();

    useEffect(() => {
        const isActiveLink = links.some(link => {
            const href = link.slug ? `/services/${link.slug}` : link.to;
            return router.asPath === href;
        });

        setActive(isActiveLink);
    }, [links, router.asPath, setActive]);

    const handleClick = (e, href) => {
        onClick(e);
        closeMobileNav();
        router.push(href);
    };

    return (
        <ul className={`${styles.LinkList} ${isOpen ? styles.Visible : ''}`}>
            {links.map((item, i) => {
                const href = item.slug ? `/services/${item.slug}` : item.to;
                const isActive = router.asPath === href;

                return (
                    <li onClick={(e) => handleClick(e, href)} key={i} className={`${styles.linkListItem} `}>
                        <Link href={href}>
                            <a className={isActive ? styles.Active : ''}>{item.title} <Icon
                                icon='ph:caret-circle-right-thin'/> </a>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default LinkList;
