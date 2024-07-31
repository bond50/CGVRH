import Link from 'next/link';
import Image from "next/image";
import React from "react";
import styles from '../../../styles/Logo.module.css'

const Logo = ({scrolled}) => {
    return (
        <Link href={`/`}>
            <a className={scrolled ? styles['logo-scrolled'] : styles['logo']}>
                <Image
                    className="img-fluid"
                    width={128}
                    height={73}
                    src={`/logo/logo.png`}
                    alt={'logo'}
                />
            </a>
        </Link>
    );
};


export default Logo;