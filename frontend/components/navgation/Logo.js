import Link from 'next/link';
import Image from "next/image";
import React from "react";

const Logo = ({textLogo, scrolled}) => {
    return <Link href={`/`}>
        {textLogo ?
            <h1 className="logo">
                <a>Home<span>.</span>
                </a>
            </h1>
            :
            <a className={scrolled ? 'logo-fixed' : 'logo'}>
                <Image
                    className="img-fluid"
                    width={128}
                    height={73}
                    src={`/logo/logo.png`}
                    alt={'logo'}
                />
            </a>
        }
    </Link>

};

export default Logo;