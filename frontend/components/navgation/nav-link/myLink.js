import React from 'react';
import Link from "next/link";

const MyLink = ({children, to, active, clicked, external}) => {
    return (
        <li onClick={clicked}>
            {external ? <a href={to} className={`nav-link ${active ? 'active' : null}`}>{children}</a> : <Link href={to}>
                <a className={`nav-link ${active ? 'active' : null}`}>{children}</a>
            </Link>}

        </li>
    );
};

export default MyLink;