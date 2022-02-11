import React, {Fragment} from 'react';
import Link from "next/link";
import classes from './menu-item.module.css'

const MenuItem = ({href, text, deepText, nested,reload, clicked}) => {

    let dropIcon = <i className="bi bi-chevron-down"/>
    if (nested) {
        dropIcon = <i className="bi bi-chevron-right"/>
    }

    return (
        <li className={deepText ? `dropdown` : null} onClick={clicked}>
            {reload  ? <a href={href}>jjj</a> :
                <Link href={href}>
                    <a className={`nav-item ${classes.MenuItem}`}>
                        {deepText ?
                            <Fragment>
                                <span>{deepText}</span>{dropIcon}
                            </Fragment> : text
                        }
                    </a>
                </Link>}
        </li>
    );
};

export default MenuItem;