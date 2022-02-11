import Link from 'next/link';
import Image from "next/image";
import classes from '../../styles/Logo.module.css'
import React from "react";

const Logo = ({textLogo}) => {
    return <div className={classes.Logo}>
        {textLogo ? <Link href={`/`}>
                <h1 className="text-light"><a><span>Home</span></a></h1>
            </Link> :
            <Link href={`/`}>
                <a>
                    <Image
                        className="img-fluid"
                        width={96}
                        height={54}
                        src={`/logo/logo.png`}
                        alt={'logo'}
                    />
                </a>
            </Link>}

    </div>;
};

export default Logo;