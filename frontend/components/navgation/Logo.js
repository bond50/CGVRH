import Link from 'next/link';
import Image from "next/image";
import React from "react";

const Logo = ({scrolled}) => {
    return (
        <Link href={`/`}>
            <a className={scrolled ? 'logo-scrolled' : 'logo'}>
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