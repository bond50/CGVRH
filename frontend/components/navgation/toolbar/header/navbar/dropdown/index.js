import useSWR from 'swr';
import axiosInstance from "../../../../../../axios/axios";
import { Icon } from "@iconify/react";
import LinkList from "./link-list";
import MegaMenu from "./mega-menu";
import styles from '../../../../../../styles/Dropdown.module.css';
import { useState, useEffect, useRef } from 'react';

const Dropdown = ({ caption, backendSlug, clientSideList, closeMobileNav, isMobileNavOpen, isOpen, setActiveDropdown }) => {
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [hasActiveChild, setHasActiveChild] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1280);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { data, error } = useSWR(
        backendSlug ? `/page-cat-name/${backendSlug}` : null,
        url => axiosInstance.get(url).then(res => res.data)
    );

    useEffect(() => {
        if (dropdownRef.current) {
            const childrenArray = Array.from(dropdownRef.current.querySelectorAll('li'));
            const hasActive = childrenArray.some(child => child.classList.contains('active'));
            setHasActiveChild(hasActive);
        }
    }, [isOpen]);

    if (error) {
        console.error('Error loading pages:', error);
        return <div>Error loading pages</div>;
    }

    let items;

    if (clientSideList) {
        items = clientSideList;
    } else if (data && Array.isArray(data.pages)) {
        items = data.pages;
    } else {
        items = [];
    }

    if (!items || items.length === 0) {
        return null;
    }

    const isMegaMenu = items.length >= 9;

    const handleMouseEnter = () => {
        if (!isMobileNavOpen) {
            setActiveDropdown(backendSlug || caption);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobileNavOpen) {
            setActiveDropdown(null);
        }
    };

    const handleClick = () => {
        setActiveDropdown(isOpen ? null : (backendSlug || caption));
    };

    return (
        <li className={`${styles.DropdownWrapper} ${isMegaMenu ? styles.Mega : ''} ${isOpen ? styles.Active : ''} ${hasActiveChild ? styles.Active : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}>
            <div className={`${styles.DropdownCaption} ${isOpen ? styles.Active : ''}`}
                 onClick={handleClick}>
                <span>{caption}</span>
                <Icon icon='bi:chevron-down' className={`${styles.Icon} ${isOpen ? styles.Rotate : ''}`} />
            </div>
            {isLargeScreen && isMegaMenu ? (
                <MegaMenu
                    items={items}
                    onClick={handleClick}
                    isOpen={isOpen}
                    setActive={setHasActiveChild}
                />
            ) : (
                <LinkList
                    links={items}
                    onClick={handleClick}
                    isOpen={isOpen}
                    closeMobileNav={closeMobileNav}
                    setActive={setHasActiveChild}
                />
            )}
        </li>
    );
};

export default Dropdown;
