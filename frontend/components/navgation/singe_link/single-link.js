import {Fragment} from "react";
import Link from "next/link";
import classes from './single-link.module.css'

const SingleLink = ({className, href, children, text, deepText, nested, clicked, mega}) => {

    let dropIcon = <i className="bi bi-chevron-down"/>
    if (nested) {
        dropIcon = <i className="bi bi-chevron-right"/>
    }


    if (deepText) {
        return (
            <li className={`dropdown`} onClick={clicked}>
                <Link href={'#'}>
                    <a className={`menu-item nav-item ${className}`}>
                        {deepText ?
                            <Fragment>
                                <span>{deepText}</span>{dropIcon}
                            </Fragment> : text
                        }
                    </a>
                </Link>
                {children}
            </li>
        );
    } else {
        return (
            <li onClick={clicked}>
                <Link href={href}>
                    <a className={`menu-item nav-item ${className}`}>
                        {deepText ?
                            <Fragment>
                                <span>{deepText}</span>{dropIcon}
                            </Fragment> : text
                        }
                    </a>
                </Link>
                {children}
            </li>
        );
    }
};

export default SingleLink;