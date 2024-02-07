import React from 'react';
import Link from "next/link";

const MyLink = ({children, to, active, clicked}) => {
    return (
        <li onClick={clicked}>
            <Link href={to}>
                <a className={`${active ? 'active' : ''}`}>{children}</a>
            </Link>
        </li>
    );
};

export default MyLink;