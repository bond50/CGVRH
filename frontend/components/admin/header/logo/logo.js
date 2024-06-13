import {useEffect, useState} from 'react';
import classes from './logo.module.css';
import Link from 'next/link';
import Image from "next/image";
import {isAuth} from "../../../../actions/auth";

const Logo = ({clicked}) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        setAuth(isAuth());
    }, []);

    return (
        <div className={classes.Logo}>
            <Link href={`/user`}>
                <a className={classes.Link}>
                    <Image src={`/logo/logo.png`} alt="logo" width={298} height={165}/>
                    {auth && (
                        <span className="d-none d-lg-block mx-1">
                            {`${auth.username.toUpperCase()}'s Dashboard`}
                        </span>
                    )}
                </a>
            </Link>
            <i className={`bi bi-list ${classes.Icon}`} onClick={clicked}/>
        </div>
    );
};

export default Logo;
