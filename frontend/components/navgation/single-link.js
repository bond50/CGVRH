import {Fragment} from "react";
import Link from "next/link";

const SingleLink = ({className, href, children, text, deepText, nested,clicked}) => {
    let dropIcon = <i className="bi bi-chevron-down"/>
    if (nested) {
        dropIcon = <i className="bi bi-chevron-right"/>
    }

    return (
        <li className={deepText ? 'dropdown' : null} onClick={clicked}>
            <Link href={href}>
                <a className={className} href={href}>
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
};

export default SingleLink;