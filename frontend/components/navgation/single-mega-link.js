import Link from "next/link";
import styles from "../../styles/featured-services.module.css";
import {Fragment} from "react";

const SingleMegaLink = ({href, title}) => {

    return (
            <li>
                <i className="bi bi-chevron-right"/>
                <Link href={href}>
                    <a>{title}</a>
                </Link>
            </li>
    );
};

export default SingleMegaLink;