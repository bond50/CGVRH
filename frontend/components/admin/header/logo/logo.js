import classes from './logo.module.css'
import Link from 'next/link'
import {useState} from "react";


const Logo = ({clicked}) => {
    return (
        <div className={classes.Logo}>
            <Link href={`/`}>
                <a className={classes.Link}>
                    <img src={`/logo/logo.png`} alt="logo"/>
                    <span className="d-none d-lg-block">HospitalAdmin</span>
                </a>
            </Link>
            <i className={`bi bi-list ${classes.Icon}`} onClick={clicked}/>
        </div>
    );
};

export default Logo;