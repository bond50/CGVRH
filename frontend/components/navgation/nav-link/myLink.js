import React from 'react';
import Link from "next/link";
import {useRouter} from 'next/router';

const MyLink = ({children, to, clicked}) => {
    const router = useRouter();
    const isActive = router.pathname === to;

    return (
        <li onClick={clicked}>
            <Link href={to}>
                <a className={`${isActive ? 'active' : ''}`}>{children}</a>
            </Link>
        </li>
    );
};

export default MyLink;
