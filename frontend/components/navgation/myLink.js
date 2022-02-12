import React from 'react';
import Link from 'next/link'

const MyLink = ({dropdown, caption, to, active}) => {
    return (
        <li>
            <Link href={to}>
                <a className={dropdown ? null : `nav-link ${active ? "active" : ''}`}>{caption}</a>
            </Link>
        </li>
    );
};

export default MyLink;